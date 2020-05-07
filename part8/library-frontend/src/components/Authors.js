  
import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_BIRTHYEAR } from '../queries'

const Authors = (props) => {
  const { loading, data } = useQuery(ALL_AUTHORS)
  const [name, setName] = useState('')
  const [year, setYear] = useState('')
  const [editYear] = useMutation(UPDATE_BIRTHYEAR)

  const submit = () => {
    editYear({ variables: { author: name, year: parseInt(year) } })
    setName('')
    setYear('')
  }

  if (!props.show) {
    return null
  }
  if (loading) return <p>Loading ...</p>

  const authors = data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name
          <input
            type='text' 
            value={name} 
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            type='number' 
            value={year} 
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>

    </div>
  )
}

export default Authors
