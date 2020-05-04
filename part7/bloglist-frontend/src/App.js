import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogCard from './components/BlogCard'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import UserList from './components/UserList'
import User from './components/User'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './actions/notification'
import { initializeBlogs, addBlog, addLike, deleteBlog } from './actions/blogs'
import { setUser } from './actions/login'
import { initializeUsers } from './actions/users'
import {
  Switch, Route, Link, Redirect, useRouteMatch
} from 'react-router-dom'
import {
  AppBar, Toolbar, Button, Container, Typography, Grid
} from '@material-ui/core'

import { Alert } from '@material-ui/lab'

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
  const notification = useSelector(state => state.notification)

  const userIdMatch = useRouteMatch('/users/:id')
  const userMatch = userIdMatch? 
    users.find(user => user.id === userIdMatch.params.id) : null

  const blogIdMatch = useRouteMatch('/blogs/:id')
  const blogMatch = blogIdMatch? 
    blogs.find(blog => blog.id === blogIdMatch.params.id) : null
    
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

  const handleLogin = async (userObject, history) => {
    try {
      const loggedUser = await loginService.login(userObject)
      window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
      blogService.setToken(loggedUser.token)
      dispatch(setUser(loggedUser))
      history.push('/blogs')
      dispatch(setNotification(`welcome ${loggedUser.username}`, 'success', timeout))
    } catch (exception) {
      dispatch(setNotification('wrong username or password', 'error', timeout))
    }
  }

  const handleLogout = async () => {
    try {
      window.localStorage.removeItem('loggedUser')
      dispatch(setNotification('logout successful', 'success', timeout))
      dispatch(setUser(null))
    } catch (exception) {
      dispatch(setNotification('logout failed', 'error', timeout))
    }
  }

  const createBlog = async blogObject => {
    try {
      blogFormRef.current.toggleVisibility()
      const response = await blogService.create(blogObject)
      const blogDataWithUserName = await blogService.getItem(response)
      dispatch(addBlog(blogDataWithUserName))
      dispatch(setNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`, 'success', timeout))
    } catch (exception) {
      dispatch(setNotification('fill all the fields', 'error', timeout))
    }
  }

  const likeBlog = async blogObject => {
    try {
      await blogService.update({...blogObject, user: blogObject.user.id})
      dispatch(addLike(blogObject))
      dispatch(setNotification(`you liked ${blogObject.title} by ${blogObject.author}`, 'success', timeout))
    } catch (exception) {
      dispatch(setNotification('adding like failed', 'error', timeout))
    }
  }

  const removeBlog = async blogObject => {
    try {
      await blogService.deleteItem(blogObject)
      dispatch(deleteBlog(blogObject))
      dispatch(setNotification(`a new blog ${blogObject.title} by ${blogObject.author} deleted`, 'success', timeout))
    } catch (exception) {
      dispatch(setNotification('remove failed', 'error', timeout))
    }
  }


  const BlogList = () => {

    return (
    <Container>
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
          <BlogCard key={blog.id} blog={blog} />
        )}
      </div>
    </Container>
    )
  }

  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
        <Grid
          justify="space-between"
          container 
          spacing={1}
        >
          <Typography variant='h6'>
            Blog App
          </Typography>
          <Button color='inherit' component={Link} to='/blogs'>
            Blogs
          </Button>
          <Button color='inherit' component={Link} to='/users'>
            Users
          </Button>
          {!user ? 
          <Button style={{ flex: 1 }} color='inherit' component={Link} to='/login'>
          Login
          </Button> :
        <Button color='inherit' onClick={handleLogout}>Logout</Button>
        }
        </Grid>
        </Toolbar>
      </AppBar>

        {notification && <Alert severity={notification.severity}>{notification.message}</Alert>}

        <Switch>
          <Route path='/users/:id'>
            <User user={userMatch} />
          </Route>
          <Route path='/blogs/:id'>
            <Blog blog={blogMatch} update={likeBlog} remove={removeBlog} user={user}/>
          </Route>
        <Route path='/users'>
          <UserList users={users} />
        </Route>
        <Route path='/login'>
          <LoginForm handleLogin={handleLogin}/>
        </Route>
        <Route path='/blogs'>
          <BlogList />
        </Route>
        <Route path='/'>
          {user ? <Redirect to="/blogs" /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </div>
  )
}

export default App