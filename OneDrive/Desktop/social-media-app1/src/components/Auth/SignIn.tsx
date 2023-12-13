// SignIn.tsx
import React, { useState } from 'react'
import { Input, Button, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext'
import style from './SignIn.module.css'

const SignIn: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = () => {
    // Basic validation
    if (!username || !password) {
      message.error('Please enter both username and password.')
      return
    }

    if (username === 'demo' && password === 'demo') {
      message.success('Sign In successful!')
      login() // Log in the user
      navigate('/')
    } else {
      message.error('Invalid credentials. Please try again.')
    }
  }

  return (
    <form>
      <div>
        <Input
          id="signin-username"
          name="signin-username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input.Password
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="primary" onClick={handleSubmit}>
          Sign In
        </Button>

        <div>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
        <div>
          You are now Logged-In<Link to="/home">Home</Link>
        </div>
      </div>
    </form>
  )
}

export default SignIn
