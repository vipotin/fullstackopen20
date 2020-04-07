import React, {useState} from 'react' 

const LoginForm = ({ 
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleSubmit }) => {
  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input type='text' value={username} name='Username'
          onChange={handleUsernameChange}/>
        </div>
        <div>
          password
          <input type='password' value={password} name='Password'
          onChange={handlePasswordChange}/>
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
    )
  }

  export default LoginForm