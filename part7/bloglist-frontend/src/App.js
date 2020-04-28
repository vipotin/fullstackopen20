import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import UserList from './components/UserList'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './actions/notification'
import { initializeBlogs, addBlog, addLike, deleteBlog } from './actions/blogs'
import { setUser } from './actions/login'
import { initializeUsers } from './actions/users'
import {
  BrowserRouter as Router,
  Switch, Route, Link, Redirect
} from 'react-router-dom'

const App = () => {
  const user = useSelector(state => state.loggedUser)
  const users = useSelector(state => state.users)
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const blogFormRef = React.createRef()
  const dispatch = useDispatch()
  const timeout = 4
  const blogs = useSelector(state => state.blogs).sort((a, b) => b.likes - a.likes)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      dispatch(initializeBlogs(blogs))
    )
    userService.getAll().then(users =>
      dispatch(initializeUsers(users))
    )
  }, [dispatch])
  

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      dispatch(setUser(loggedUser))
      blogService.setToken(loggedUser.token)
    }
  }, [dispatch])

  const handleLogin = async userObject => {
    try {
      console.log(userObject.username, userObject.password)
      const loggedUser = await loginService.login(userObject)
      window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
      blogService.setToken(loggedUser.token)
      dispatch(setUser(loggedUser))
      dispatch(setNotification('login successful', false, timeout))
    } catch (exception) {
      dispatch(setNotification('wrong username or password', true, timeout))
    }
  }

  const handleLogout = async () => {
    try {
      window.localStorage.removeItem('loggedUser')
      dispatch(setNotification('logout successful', false, timeout))
      dispatch(setUser(null))
    } catch (exception) {
      dispatch(setNotification('logout failed', true, timeout))
    }
  }

  const createBlog = async blogObject => {
    try {
      blogFormRef.current.toggleVisibility()
      const response = await blogService.create(blogObject)
      const blogDataWithUserName = await blogService.getItem(response)
      dispatch(addBlog(blogDataWithUserName))
      dispatch(setNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`, false, timeout))
    } catch (exception) {
      dispatch(setNotification('fill all the fields', true, timeout))
    }
  }

  const likeBlog = async blogObject => {
    try {
      let updatedBlog = blogObject
      updatedBlog.user = blogObject.user.id
      const blogData = await blogService.update(updatedBlog)
      dispatch(addLike(blogData))
      dispatch(setNotification(`you liked ${blogObject.title} by ${blogObject.author}`, false, timeout))
    } catch (exception) {
      dispatch(setNotification('adding like failed', true, timeout))
    }
  }

  const removeBlog = async blogObject => {
    try {
      await blogService.deleteItem(blogObject)
      dispatch(deleteBlog(blogObject))
      dispatch(setNotification(`a new blog ${blogObject.title} by ${blogObject.author} deleted`, false, timeout))
    } catch (exception) {
      dispatch(setNotification('remove failed', true, timeout))
    }
  }

  const Info = () => {
    if (!user) return null
    return (
    <div>
      <h2>blogs</h2>
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
    </div>
    )
  }

  const BlogList = () => (
    <div>
      <br></br>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm
          title={blogTitle}
          author={blogAuthor}
          url={blogUrl}
          handleTitleChange={({ target }) => setBlogTitle(target.value)}
          handleAuthorChange={({ target }) => setBlogAuthor(target.value)}
          handleUrlChange={({ target }) => setBlogUrl(target.value)}
          createBlog={createBlog}
        />
      </Togglable>
      <br></br>
      <div id='blogList'>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} update={likeBlog} remove={removeBlog} user={user}/>
        )}
      </div>
    </div>
  )

  return (
    <div>
      <Router>
        <div>
          <Link to='/'>home </Link>
          <Link to='/users'>users </Link>
          {/* <Link to='/blogs'>blogs </Link> */}
        </div>

        <Notification />
        <Info />

        <Switch>
          <Route path='/users/:id'>
            
          </Route>
        <Route path='/users'>
          <UserList users={users} />
        </Route>
        <Route path='/login'>
          <LoginForm handleLogin={handleLogin}/>
        </Route>
        <Route path='/blogs'>
          {console.log(user, user !== null)}
          {user ? <BlogList /> : <Redirect to="/login" />}
        </Route>
        <Route path='/'>
          {user ? <Redirect to="/blogs" /> : <Redirect to="/login" />}
        </Route>
      </Switch>

      </Router>
    </div>
  )
}

export default App