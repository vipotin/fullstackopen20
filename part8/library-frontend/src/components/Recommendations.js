import React, { useState, useEffect } from 'react'
import BookList from './BookList'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, GET_USERDATA } from '../queries'

const Recommendations = ({ show }) => {
  const userData = useQuery(GET_USERDATA)
  const [favGenre, setFavGenre] = useState(null)

  useEffect(() => {
    userData.data ? setFavGenre(userData.data.me.favoriteGenre) : setFavGenre(null)
  }, [userData.data])

  const bookData = useQuery(ALL_BOOKS, {
    variables: { genre: favGenre }
  })

  if (!show) {
    return null
  }

  if (userData.loading || bookData.loading) return <p>Loading...</p>

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b>{favGenre}</b></p>
      <BookList books={bookData.data.allBooks} />
    </div>
  )
}

export default Recommendations