import React from 'react'
import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
  Button

} from '@material-ui/core'

const UserList = ({users}) => {
  if (!users) return null
  
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography variant='h6'>User</Typography>
            </TableCell>
            <TableCell>
              <Typography variant='h6'>Blogs created</Typography>
            </TableCell>
          </TableRow>

          {users.map(user => 
          <TableRow key={user.id}>
            <TableCell>
              <Button component={Link} to={`/users/${user.id}`}>{user.name}</Button>
            </TableCell>
            <TableCell>{user.blogs.length}</TableCell>
          </TableRow>
            )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default UserList