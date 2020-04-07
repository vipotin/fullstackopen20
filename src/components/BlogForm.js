import React, {useState} from 'react' 

const BlogForm = ({
  title,
  author,
  url,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  handleSubmit }) => {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={handleSubmit}>
          title: 
          <input type='text' value={title} name='BlogTitle' 
          onChange={handleTitleChange}/>
          <br></br>author:
          <input type='text' value={author} name='BlogAuthor' 
          onChange={handleAuthorChange}/>
          <br></br>url:
          <input type='text' value={url} name='BlogUrl' 
          onChange={handleUrlChange}/>
          <br></br><button type='submit'>save</button>
        </form>
      </div>

    )
  }

  export default BlogForm