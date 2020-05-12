import React, { useState, useEffect } from 'react'
import BookList from './BookList'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {

  const [genre, setGenre] = useState(null)
  const { loading, data } = useQuery(ALL_BOOKS, {
    variables: { genre }
  })
  // const [genres, setGenres] = useState([])

  // useEffect(() => {
  //   const genreList = data.allBooks.map(book => book.genres.reduce((acc, current) => {
  //     return acc.includes(current) ? acc : acc.concat(current)
  //   }))
  //   setGenres(genreList)
  // }, [data.allBooks])

  if (!props.show) {
    return null
  }

  const genres = ['refactoring', 'test']
  const books = data.allBooks

  if (loading) return <p>Loading...</p>

  return (
    <div>
      <h2>books</h2>

      {genre ? <p>in genre <b>{genre}</b></p> : null}

      <BookList books={books} />

      {genres.map(genre =>
        <button key={genre} value={genre} onClick={({ target }) => setGenre(target.value)}>{genre}</button>
      )}
      <button key='allGenres' onClick={() => setGenre(null)}>all genres</button>
    </div>
  )
}

export default Books