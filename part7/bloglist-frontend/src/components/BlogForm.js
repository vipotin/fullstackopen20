import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { TextField, Button, Typography } from '@material-ui/core'

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
      <Typography variant='h6'>Create a new blog</Typography>
      <form onSubmit={addBlog}>
        <div>
          <TextField required='true' label='title' value={title}
            onChange={({ target }) => setTitle(target.value)}/>
        </div>
        <div>
          <TextField required='true' label='author' value={author} name='BlogAuthor'
            onChange={({ target }) => setAuthor(target.value)}/>
        </div>
        <div>
          <TextField required='true' label='url' type='text' value={url} name='BlogUrl'
            onChange={({ target }) => setUrl(target.value)}/>
        </div>
          <Button type='submit' variant='contained' color='primary'>save</Button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm