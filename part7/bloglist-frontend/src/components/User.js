import React from 'react'
import BlogCard from './BlogCard'
import {
  Card, List, CardContent, Typography
} from '@material-ui/core'

const User = ({ user }) => {
  
  if (!user) return null
  console.log(user, user.blogs)

  return (
    <Card>
      <CardContent>
        <Typography variant='h6'>{user.name}</Typography>
        {user.blogs.length !== 0 ? 
        <Typography variant='body1'>Added blogs</Typography> :
        <Typography variant='body1'>No added blogs</Typography>}
        
        <List>
        {user.blogs.map(blog => 
        <BlogCard blog={blog} key={blog.id}>{blog.title}</BlogCard>
        )}
      </List>
      </CardContent>
    </Card>
  )
}

export default User