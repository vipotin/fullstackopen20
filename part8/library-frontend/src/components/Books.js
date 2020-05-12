import React, { useState, useEffect } from 'react'
import BookList from './BookList'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {

  const [genre, setGenre] = useState(null)
  const [genres, setGenres] = useState([])
  const { loading, data } = useQuery(ALL_BOOKS, {
    variables: { genre }
  })

  const reducer = (acc, current) => {
    current.genres.forEach(genre => {
      if (!acc.includes(genre)) {
        acc.push(genre)
      }
    })
    return acc
  }

  useEffect(() => {
    let genrelist = null
    if (!loading && !genre) {
     genrelist = data.allBooks.reduce(reducer,[])
     setGenres(genrelist)
    }
  }, [loading, genre, data])

  if (!props.show) {
    return null
  }

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