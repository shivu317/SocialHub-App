import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Login.module.css'
import { useAuth } from './AuthContext'

interface UserType {
  id: string
  name: string
  email: string
  // We can Add other fields as needed
}

const Login: React.FC = () => {
  console.log('Login component rendered')
  const [inputValue, setInputValue] = useState({ name: '', email: '' })
  const navigate = useNavigate()
  const authContext = useAuth()

  useEffect(() => {
    const getUserData = localStorage.getItem('userData')
    if (getUserData) {
      setInputValue((prevState) => ({
        ...prevState,
        ...JSON.parse(getUserData),
      }))
    }
  }, [])

  function getData(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const getUserArr = localStorage.getItem('userData')
    if (getUserArr) {
      try {
        const userData = JSON.parse(getUserArr)
        const { name, email } = inputValue
        const userLogin = userData.find(
          (element: UserType) =>
            element.name.toLowerCase().replace(/\s/g, '') ===
              name.toLowerCase().replace(/\s/g, '') &&
            element.email.toLowerCase().replace(/\s/g, '') ===
              email.toLowerCase().replace(/\s/g, '')
        )

        if (!userLogin) {
          alert('Invalid details')
        } else {
          localStorage.setItem('isUserLoggedIn', 'true')
          authContext.login()
          navigate('/')
        }
      } catch (error) {
        console.error('Error parsing userData:', error)
        alert('User data is invalid')
      }
    } else {
      alert('User data not found')
    }
  }

  return (
    <div className={styles.Login}>
      <div className={styles.Logo}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="User Name"
            value={inputValue.name}
            onChange={getData}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={inputValue.email}
            onChange={getData}
          />

          <div className={styles.Buttons}>
            <button>Log in</button>
          </div>
        </form>
        <div>Don't have an account?</div> <Link to="/signup"> Sign Up</Link>
      </div>
    </div>
  )
}

export default Login
