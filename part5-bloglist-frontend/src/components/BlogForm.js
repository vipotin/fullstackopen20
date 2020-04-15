import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = event => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <div className='form'>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        title:
        <input id='title' type='text' value={title} name='BlogTitle'
          onChange={({ target }) => setTitle(target.value)}/>
        <br></br>author:
        <input id='author' type='text' value={author} name='BlogAuthor'
          onChange={({ target }) => setAuthor(target.value)}/>
        <br></br>url:
        <input id='url' type='text' value={url} name='BlogUrl'
          onChange={({ target }) => setUrl(target.value)}/>
        <br></br><button type='submit'>save</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm