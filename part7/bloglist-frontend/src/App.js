import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch } from 'react-redux'
import { setNotification } from './actions/notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const blogFormRef = React.createRef()
  const dispatch = useDispatch()
  const timeout = 4

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

  const handleLogin = async userObject => {
    try {
      console.log(userObject.username, userObject.password)
      const loggedUser = await loginService.login(userObject)
      window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
      blogService.setToken(loggedUser.token)
      setUser(loggedUser)
      dispatch(setNotification('login successful', false, timeout))
    } catch (exception) {
      dispatch(setNotification('wrong username or password', true, timeout))
    }
  }

  const handleLogout = async () => {
    try {
      window.localStorage.removeItem('loggedUser')
      dispatch(setNotification('logout successful', false, timeout))
      setUser(null)
    } catch (exception) {
      dispatch(setNotification('logout failed', true, timeout))
    }
  }

  const addBlog = async blogObject => {
    try {
      blogFormRef.current.toggleVisibility()
      await blogService.create(blogObject)
      updateBlogList()
      dispatch(setNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`, false, timeout))
    } catch (exception) {
      dispatch(setNotification('fill all the fields', true, timeout))
    }
  }

  const addLike = async blogObject => {
    try {
      let updatedBlog = blogObject
      updatedBlog.user = blogObject.user.id
      await blogService.update(updatedBlog)
      updateBlogList()
      dispatch(setNotification(`you liked ${blogObject.title} by ${blogObject.author}`, false, timeout))
    } catch (exception) {
      dispatch(setNotification('adding like failed', true, timeout))
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
      dispatch(setNotification(`a new blog ${blogObject.title} by ${blogObject.author} deleted`, false, timeout))
    } catch (exception) {
      dispatch(setNotification('deleting failed', true, timeout))
    }
  }

  const loginForm = () => (
    <div>
      <LoginForm handleLogin={handleLogin}/>
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
      <div id='blogList'>
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} update={addLike} remove={deleteBlog} user={user}/>
        )}
      </div>

    </div>
  )

  return (
    <div>
      <Notification />
      {user === null ? loginForm() : blogSection()}
    </div>
  )
}

export default App