import React from 'react'
import { Link } from 'react-router-dom'
import {
  Card, CardContent, Typography, Button
} from '@material-ui/core'

const BlogCard = ({blog}) => {
  return (
    <Card key={blog.id} variant='outlined' style={{margin: '10px'}}>
      <CardContent>
        <Typography>
          {blog.title}
        </Typography>
        <Button variant='outlined' color='primary' component={Link} to={`/blogs/${blog.id}`}>More</Button>
      </CardContent>
    </Card>
)}

export default BlogCard