import React, { useState } from 'react'
const Blog = ({ blog }) => {
  const fullContent = (
      <div>
        {blog.title} {blog.author}
        <br></br>{blog.url}
        <br></br>likes {blog.likes} <button>like</button>
      </div>
  )

  const shortContent = (
    <div>
      {blog.title} {blog.author}
    </div>
  )

  const [showDetails, setShowDetails] = useState(false)
  const [buttonText, setButtonText] = useState('view')
  const [content, setContent] = useState(shortContent)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const changeView = () => {
    setShowDetails(!showDetails)
    if (showDetails) {
      setButtonText('hide')
      setContent(fullContent)
    } else {
      setButtonText('view')
      setContent(shortContent)
    }
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
