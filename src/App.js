import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [notification, setNotification] = useState(null)
  const [errorOccured, setErrorOccured] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const showNotification = (message, error) => {
    setNotification(message)
    setErrorOccured(error)
    setTimeout(() => {
      setNotification(null)
      setErrorOccured(false)
    }, 4000)
  }

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const loggedUser = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
      blogService.setToken(loggedUser.token)
      setUser(loggedUser)
      showNotification('login successful', false)
      setUsername('')
      setPassword('')
    } catch (exception) {
      showNotification('wrong username or password', true)
    }
  }

  const handleLogout = async event => {
    try {
      window.localStorage.removeItem('loggedUser')
      showNotification('logout successful', false)
      setUser(null)
    } catch (exception) {
      showNotification('logout failed', true)
    }
  }

  const handleCreateBlog = async event => {
    event.preventDefault()
    try {
      const newBlog = {
        title: blogTitle,
        author: blogAuthor,
        url: blogUrl
      }
      await blogService.create(newBlog)
      const blogList = await blogService.getAll()
      setBlogs(blogList)
      showNotification(`a new blog ${blogTitle} by ${blogAuthor} added`, false)
    } catch (exception) {
        showNotification('fill all the fields', true)
    }
  }

  const loginForm = () => (
    <div>
      <LoginForm
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
              handleSubmit={handleLogin}
            />
    </div>
  )

  const blogSection = () => (
    <div>
      <h2>blogs</h2>
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      <br></br>
      <Togglable buttonLabel='new blog'>
        <BlogForm
          title={blogTitle}
          author={blogAuthor}
          url={blogUrl}
          handleTitleChange={({ target }) => setBlogTitle(target.value)}
          handleAuthorChange={({ target }) => setBlogAuthor(target.value)}
          handleUrlChange={({ target }) => setBlogUrl(target.value)}
          handleSubmit={handleCreateBlog}
        />
      </Togglable>
      <br></br>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      <Notification errorOccured={errorOccured} message={notification} />
      {user === null ? loginForm() : blogSection()}
    </div>
  )
}

export default App