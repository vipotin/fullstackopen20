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
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
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

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const loggedUser = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
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

  const handleLogout = async event => {
    try {
      window.localStorage.removeItem('loggedUser')
      setUser(null)
    } catch (exception) {

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
    } catch (exception) {

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
      <div>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>logout</button>
      </div>
      <h2>create new</h2>
      <form onSubmit={handleCreateBlog}>
        title: 
        <input type='text' value={blogTitle} name='BlogTitle' 
        onChange={({ target }) => setBlogTitle(target.value)}/>
        <br></br>author:
        <input type='text' value={blogAuthor} name='BlogAuthor' 
        onChange={({ target }) => setBlogAuthor(target.value)}/>
        <br></br>url:
        <input type='text' value={blogUrl} name='BlogUrl' 
        onChange={({ target }) => setBlogUrl(target.value)}/>
        <br></br><button type='submit'>create</button>
      </form>
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