import React, { useState } from 'react'

const Blog = ({ blog, user, update, remove }) => {

  const [likes, setLikes] = useState(blog.likes)

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

  const content = () => (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
      <br></br>{blog.url}
      <br></br>likes {likes}
      <button id='likeButton' onClick={updateLikes}>like</button>
      <br></br>added by {blog.user.name}
      <br></br>{blog.user.username === user.username ? <button onClick={removeBlog}>remove</button> : null}
    </div>
  )

  console.log(blog)

  if (!blog) return null

  return (
    <div className='blog'>
      {content()}
    </div>
  )
}

export default Blog
