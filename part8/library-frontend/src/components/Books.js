import React, { useState, useEffect } from 'react'
import BookList from './BookList'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const [genres, setGenres] = useState([])

  const [getBooks, { loading, data }] = useLazyQuery(ALL_BOOKS)

  const reducer = (acc, current) => {
    current.genres.forEach(genre => {
      if (!acc.includes(genre)) {
        acc.push(genre)
      }
    })
    return acc
  }

  const changeGenre = (newGenre) => {
    getBooks({ variables: { genre: newGenre} })
    setGenre(newGenre)
  }

  // Get all the books on the first render
  useEffect(() => {
    getBooks()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Get all the genres
  useEffect(() => {
    let genrelist = null
    if (!loading && !genre && data) {
     genrelist = data.allBooks.reduce(reducer,[])
     setGenres(genrelist)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])


  if (!props.show) {
    return null
  }

  if (loading) return <p>Loading...</p>

  return (
    <div>
      <h2>books</h2>

      {genre ? <p>in genre <b>{genre}</b></p> : null}

      <BookList books={data.allBooks} />

      {genres.map(genre =>
        <button key={genre} value={genre} onClick={({ target }) => changeGenre(target.value)}>{genre}</button>
      )}
      <button key='allGenres' onClick={() => changeGenre(null)}>all genres</button>
    </div>
  )
}

export default Books