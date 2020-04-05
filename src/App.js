import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorOccured, setErrorOccured] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const loggedUser = await loginService.login({ username, password })
      blogService.setToken(loggedUser.token)
      setUser(loggedUser)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setErrorOccured(true)
      setTimeout(() => {
        setErrorMessage(null)
        setErrorOccured(false)
      }, 4000)
    }
  }

  const loginForm = () => (
    <div>
    <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input type='text' value={username} name='Username'
          onChange={({ target }) => setUsername(target.value)}/>
        </div>
        <div>
          password
          <input type='password' value={password} name='Password'
        onChange={({ target }) => setPassword(target.value)}/>
        </div>
      <button type='submit'>login</button>
     </form>
    </div>
  )

  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      {/* <Notification errorOccured={errorOccured} message={errorMessage} /> */}
      {user === null ? loginForm() : blogForm()}
    </div>
  )
}

export default App