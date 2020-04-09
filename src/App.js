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
  const blogFormRef = React.createRef()

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

  const updateBlogList = async () => {
    const blogList = await blogService.getAll()
    setBlogs(blogList)
  }

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

  const handleLogout = async () => {
    try {
      window.localStorage.removeItem('loggedUser')
      showNotification('logout successful', false)
      setUser(null)
    } catch (exception) {
      showNotification('logout failed', true)
    }
  }

  const addBlog = async blogObject => {
    try {
      blogFormRef.current.toggleVisibility()
      await blogService.create(blogObject)
      updateBlogList()
      showNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`, false)
    } catch (exception) {
      showNotification('fill all the fields', true)
    }
  }

  const addLike = async blogObject => {
    try {
      let updatedBlog = blogObject
      updatedBlog.user = blogObject.user.id
      await blogService.update(updatedBlog)
      updateBlogList()
    } catch (exception) {
      showNotification('adding like failed', true)
    }
  }

  // const getUpdatedBlog = async blogObject => {
  //   try {
  //     return await blogService.getItem(blogObject)
  //   } catch (exception) {

  //   }
  // }

  const deleteBlog = async blogObject => {
    try {
      await blogService.deleteItem(blogObject)
      updateBlogList()
      showNotification(`a new blog ${blogObject.title} by ${blogObject.author} deleted`, false)
    } catch (exception) {
      showNotification('deleting failed', true)
    }
  }

  const loginForm = () => (
    <div>
      <LoginForm handleSubmit={handleLogin}/>
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
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm
          title={blogTitle}
          author={blogAuthor}
          url={blogUrl}
          handleTitleChange={({ target }) => setBlogTitle(target.value)}
          handleAuthorChange={({ target }) => setBlogAuthor(target.value)}
          handleUrlChange={({ target }) => setBlogUrl(target.value)}
          createBlog={addBlog}
        />
      </Togglable>
      <br></br>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} update={addLike} remove={deleteBlog} user={user}/>
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