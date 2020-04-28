import React, { useState } from 'react'

const Blog = ({ blog, user, update, remove }) => {

  console.log('render blog', blog)
  if (!blog) return null

  //const [blogContent, setBlogContent] = useState(blog)

  const updateLikes = () => {
    update({...blog, likes: blog.likes + 1})
    //setBlogContent({...blog, likes: blog.likes + 1})
  }

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      remove(blog)
    }
  }

  return ( !blog ? null :
    <div className='blog'>
       <h2>{blog.title} by {blog.author}</h2>
      <br></br>{blog.url}
      <br></br>likes {blog.likes}
      <button id='likeButton' onClick={updateLikes}>like</button>
      <br></br>added by {blog.user.name}
      <br></br>{blog.user.username === user.username ? <button onClick={removeBlog}>remove</button> : null}
    </div>
  )
}

export default Blog
