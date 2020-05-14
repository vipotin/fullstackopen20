import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import { useApolloClient, useSubscription
} from '@apollo/client'
import { BOOK_ADDED, ALL_BOOKS} from './queries'

  // const Notify = ({ message }) => {
  //   return(
  //     <div>
  //       {message}
  //     </div>
  //   )
  // }

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


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(localStorage.getItem('user-token'))
  // const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  const updateCache = (addedBook) => {
    const includedIn = (set, obj) => 
      set.map(p => p.id).includes(obj.id)

    console.log('all books cache')

    // update booklist
    const bookDataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(bookDataInStore.allBooks, addedBook)) {
      bookDataInStore.allBooks.push(addedBook)
      client.writeQuery({
        query: ALL_BOOKS,
        data: bookDataInStore
      })
    }
    console.log(bookDataInStore, client)
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const book = subscriptionData.data.bookAdded
      window.alert(`new book ${book.title} added`)
      console.log(subscriptionData)
      updateCache(book)
    }
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token  ? null : <button onClick={() => setPage('add')}>add book</button>}
        {!token ? null : <button onClick={() => setPage('recommendation')}>recommendation</button>}
        {!token  ? <button onClick={() => setPage('login')}>login</button> :
        <button onClick={() => logout()}>logout</button>}
      </div>

      <Authors
        show={page === 'authors'}
        token={token}
        updateCache={updateCache}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={token ? page === 'add' : null}
        updateCache={updateCache}
      />

      <Recommendations 
        show={token ? page === 'recommendation' : null}
      />

      <LoginForm
        show={!token ? page === 'login' : null}
        setToken={setToken}
        // setError={setErrorMessage}
      />

    </div>
  )
}

export default App