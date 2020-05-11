const { ApolloServer, gql, UserInputError } = require('apollo-server')
const { v1: uuidv1 } = require('uuid')
require('dotenv').config()
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')

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

let authorsList = [
  {
    name: 'Robert Martin',
    // id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    // author: 'Robert Martin',
    // id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

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

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
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
    addBook: async (parent, args, context, info) => {
      let author = await Author.findOne({ name: args.author })
      try {
        if (!author) {
          author = new Author({ name: args.author, born: null })
          await author.save()
        }
        const book = new Book({ ...args, author: author._id })
        await book.save()
        return book
      } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
      }
    },
    editAuthor: async (parent, args, context, info) => {
      const author = await Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo }, {
        new: true
      })
      return !author ? null : author
    }
  } 
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})