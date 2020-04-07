import React, {useState} from 'react' 

const BlogForm = ({
  createBlog }) => {
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
      <div>
        <h2>create new</h2>
        <form onSubmit={addBlog}>
          title: 
          <input type='text' value={title} name='BlogTitle' 
          onChange={({ target }) => setTitle(target.value)}/>
          <br></br>author:
          <input type='text' value={author} name='BlogAuthor' 
          onChange={({ target }) => setAuthor(target.value)}/>
          <br></br>url:
          <input type='text' value={url} name='BlogUrl' 
          onChange={({ target }) => setUrl(target.value)}/>
          <br></br><button type='submit'>save</button>
        </form>
      </div>

    )
  }

  export default BlogForm