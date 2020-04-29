import React, { useState } from 'react'
import {
  Box, Card, Avatar, CardContent, CardMedia, Typography, Divider, Button
} from '@material-ui/core'
import { Link } from 'react-router-dom'


const avatar = 'https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light'

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

  return (
    <Card 
    elevation={3} 
    style={{
      margin:'auto',
      height: '100%'
      }}>
      <CardMedia
        style={{paddingTop: "35%"}}
        image={
          "https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"
        }/>
      <CardContent>
        <Box display='flex' flexDirection='row'>
          <Box flexGrow={1}>
            <Typography variant='h6'>{blog.title}</Typography>
          </Box>

          <Box>
            <Button variant='contained' color='primary'>
            <a href={blog.url} rel='noopener noreferrer' target='_blank' style={{textDecoration: 'none', color:'black'}}>Open blog</a>
            </Button>
          </Box>
        </Box>

        <Box display='flex' flexDirection='row' alignItems='center'>
          <Box p={1}>
            <Typography>{blog.author}</Typography>
          </Box>
        </Box>
      </CardContent>

      <Divider />

      <CardContent>
        <Box display='flex' flexDirection='row' alignItems='center'>
          <Box p={1}>
            <Typography>Likes: {blog.likes}</Typography>
          </Box>
          <Box p={1}>
            <Button variant='outlined' color='primary' id='likeButton' onClick={updateLikes}>like</Button>
          </Box>
        </Box>

        <Box display='flex' flexDirection='row' alignItems='center'>
          
          <Box p={1} display='flex' flexGrow={1} flexDirection='row' alignItems='center'>
            <Box>
              <Typography>Added by <Typography style={{textDecoration:'none'}}component={Link} to={`/users/${blog.user.id}`}>{blog.user.name}</Typography>
              </Typography>
            </Box>
            <Box p={1}>
              <Avatar src={avatar} alt='avatar' component={Link} to={`/users/${blog.user.id}`}/>
            </Box>
          </Box>

          {blog.user.username === user.username ? 
        <Button variant='outlined' color='secondary' onClick={removeBlog}>Delete blog</Button> : null}
        </Box>
      </CardContent>
     
      
    </Card>
  )
}

export default Blog
