import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import { useApolloClient } from '@apollo/client'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  const Notify = ({ message }) => {
    return(
      <div>
        {message}
      </div>
    )
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  // if (!token) {
  //   return (
  //     <div>
  //       <Notify errorMessage={errorMessage} />
  //       <h2>Login</h2>
  //       <LoginForm
  //         setToken={setToken}
  //         setError={setErrorMessage}
  //         show={true}
  //       />
  //     </div>
  //   )
  // }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token  ? null : <button onClick={() => setPage('add')}>add book</button>}
        {!token  ? <button onClick={() => setPage('login')}>login</button> :
        <button onClick={() => logout()}>logout</button>}
        <button onClick={() => setPage('recommendation')}>recommendation</button>
      </div>

      <Authors
        show={page === 'authors'}
        token={token}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add' && token}
      />

      <LoginForm
        show={!token ? page === 'login' : null}
        setToken={setToken}
        setError={setErrorMessage}
      />

      <Recommendations 
        show={page === 'recommendation'}
      />


    </div>
  )
}

export default App