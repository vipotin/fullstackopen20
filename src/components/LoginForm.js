import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async event =>  {
    event.preventDefault()
    handleLogin({
      username: username,
      password: password
    })
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='Username'>username </label>
          <input id='username' type='text' value={username} name='Username'
            onChange={({ target }) => setUsername(target.value)}/>
        </div>
        <div>
          <label htmlFor='Password'>password </label>
          <input id='password' type='password' value={password} name='Password'
            onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm