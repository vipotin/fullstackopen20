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
  query {
    allBooks {
      title
      published
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
        id
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