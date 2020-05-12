import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`
export const ALL_BOOKS = gql`
  query getAllBooks($author: String, $genre: String){
    allBooks(
      author: $author
      genre: $genre
    ) {
      title
      published
      author {
        name
      }
      genres
    }
  }
`

export const NEW_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!){
    addBook(
      title: $title, 
      author: $author, 
      published: $published, 
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

export const UPDATE_BIRTHYEAR = gql`
  mutation updateAuthor($author: String!, $year: Int!){
    editAuthor(name: $author, setBornTo: $year) {
      id
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!){
    login(username: $username, password: $password) {
      value
    }
  }
`

export const GET_USERDATA = gql`
  query {
    me {
      favoriteGenre
    }
  }
`