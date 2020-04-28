import React, { useState } from 'react'

const Blog = ({ blog, user, update, remove }) => {

  const [likes, setLikes] = useState(blog.likes)
  const [showDetails, setShowDetails] = useState(false)
  const [buttonText, setButtonText] = useState('view')

  const updateLikes = () => {
    blog.likes++
    setLikes(likes + 1)
    update(blog)
  }

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      remove(blog)
    }
  }

  const fullContent = () => (
    <div>
      {blog.title} {blog.author}
      <br></br>{blog.url}
      <br></br>likes {likes}
      <button id='likeButton' onClick={updateLikes}>like</button>
      <br></br>{blog.user.name}
      <br></br>{blog.user.username === user.username ? <button onClick={removeBlog}>remove</button> : null}
    </div>
  )

  const shortContent = () => (
    <div>
      {blog.title} {blog.author}
    </div>
  )

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const changeView = () => {
    setShowDetails(!showDetails)
    !showDetails ? setButtonText('hide') : setButtonText('view')
  }

  return (
    <div className='blog' style={blogStyle}>
      {showDetails ? fullContent() : shortContent()}
      <button id='show' onClick={changeView}>{buttonText}</button>
    </div>
  )
}

export default Blog
