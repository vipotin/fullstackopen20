import React from 'react'

const BookList = ({ books }) => {
  return (
    <div>
       <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
              {/*for testing*/}
              <td>{a.genres.map(g => g)}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default BookList