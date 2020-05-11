const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const { v1: uuidv1 } = require('uuid')
require('dotenv').config()
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

mongoose.set('useFindAndModify', false)
mongoose.connect(process.env.MONGODB_URI, 
  { useNewUrlParser: true, useUnifiedTopology: true, 'useCreateIndex': true })
.then(async () => { 
  console.log('Connected to MongoDB')
  // await Author.deleteMany({})
  // await Book.deleteMany({})
  // const newauthor = await new Author(authors[0]).save()
  // const newBook = {title: 'Clean Code', published: 2008,  author: newauthor._id, genres: ['refactoring']}
  // const savedBook = await new Book(newBook).save()
  // console.log(savedBook.author, savedBook)
})
.catch((error) => { console.log('error connection to MongoDB:', error.message) })

const typeDefs = gql`
  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    books: [Book!]
    bookCount: Int
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook (
      title: String!
      author: String!
      published: Int!
      genres: [String!]
    ): Book
    editAuthor (
      name: String!
      setBornTo: Int!
    ): Author
    createUser (
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments,
    authorCount: () => Author.collection.countDocuments,
    allBooks: (root, args) => {
      // if (args.author && !args.genre)
      //   return books.filter(book => book.author === args.author)
      // else if (args.genre && !args.author)
      //   return books.filter(book => book.genres.includes(args.genre))
      // else if (args.author && args.genre)
      //   return books.filter(book => book.author === args.author 
      //     && book.genres.includes(args.genre))
      if (args.genre) {
        return Book.find({ genres: args.genre })
      }
      else return Book.find({})
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      const authorWithBooks = authors.map(async author => {
        const bookList = await Book.find({ author: author._id })
        author.books = bookList
        author.bookCount = bookList.length
        return author
      })
      return await Promise.all(authorWithBooks)
    },
    me: (root, args, context) => {
      return context.loggedUser
    }
  },
  Book: {
    author: (root) => {
      console.log('returning book')
      author = Author.findById(root.author)
      console.log(root)
      return { name: author.name, born: author.born }
    }
  },
  Mutation: {
    addBook: async (parent, args, { loggedUser }, info) => {
      if (!loggedUser) {
        throw new AuthenticationError('not authenticated')
      }
      let author = await Author.findOne({ name: args.author })
        if (!author) {
          author = new Author({ name: args.author, born: null })
          await author.save().catch(error => {
            throw new UserInputError(error.message, {
              invalidArgs: args
            })
          })
        }
        const book = new Book({ ...args, author: author._id })
        await book.save().catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        })
        return book
    },
    editAuthor: async (parent, args, { loggedUser }, info) => {
      if (!loggedUser) {
        throw new AuthenticationError('not authenticated')
      }
      const author = await Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo }, {
        new: true
      })
      return !author ? null : author
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }
  } 
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substr(7), process.env.JWT_SECRET
      )
      const loggedUser = await User.findById(decodedToken.id)
      return { loggedUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})