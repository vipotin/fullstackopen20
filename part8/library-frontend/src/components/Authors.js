  
import React, { useState } from 'react'
import Select from 'react-select'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_BIRTHYEAR } from '../queries'

const Authors = ({ show, token, updateCache }) => {
  const { loading, data } = useQuery(ALL_AUTHORS)
  const [year, setYear] = useState('')
  const [selectedAuthor, setSelectedAuthor] = useState(null)
  const [editYear] = useMutation(UPDATE_BIRTHYEAR)

  const submit = () => {
    editYear({ variables: { author: selectedAuthor.value, year: parseInt(year) } })
    setSelectedAuthor(null)
    setYear('')
  }

  if (!show) {
    return null
  }
  if (loading) return <p>Loading ...</p>

  const handleChange = (selectedOption) => {
    setSelectedAuthor(selectedOption)
  }

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

      {token ?
        <div>  
          <h3>Set birthyear</h3>
          <form onSubmit={submit}>
            <div>
              name
            </div>
            <Select 
              options={authors.map(a => ({ value: a.name, label: a.name }))}
              value={selectedAuthor}
              onChange={handleChange}
            />
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
      : null}
    </div>
  )
}

export default Authors
