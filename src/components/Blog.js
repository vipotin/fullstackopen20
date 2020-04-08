import React, { useState } from 'react'

const Blog = ({ blog, update }) => {
const [likes, setLikes] = useState(blog.likes)
  const updateLikes = () => {
    console.log('update', blog)
    blog.likes++
    update(blog)
    setLikes(likes + 1)
    setContent(fullContent)
  }
  
  const fullContent  = (
      <div>
        {blog.title} {blog.author}
        <br></br>{blog.url}
        <br></br>likes {likes} <button onClick={updateLikes}>like</button>
        <br></br>{blog.user.name}
      </div>
  )

  const shortContent = (
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

  const [showDetails, setShowDetails] = useState(false)
  const [buttonText, setButtonText] = useState('view')
  const [content, setContent] = useState(shortContent)

  const changeView = () => {
    if (!showDetails) {
      setButtonText('hide')
      setContent(fullContent)
    } else {
      setButtonText('view')
      setContent(shortContent)
    }
    setShowDetails(!showDetails)
  }

  return (
  <div style={blogStyle}>
    <div>
      {content}
    </div>
    <button onClick={changeView}>{buttonText}</button>
  </div>
  )
}

export default Blog
