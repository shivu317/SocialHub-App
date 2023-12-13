import React, { createContext, useState, useContext, useEffect } from 'react'

interface UserType {
  id: string
}

interface AuthContextProps {
  isAuthenticated: boolean
  user?: UserType
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [user, setUser] = useState<UserType | undefined>(undefined)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const storedIsAuthenticated = localStorage.getItem('isAuthenticated')

    if (storedUser && storedIsAuthenticated) {
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(Boolean(storedIsAuthenticated))
    }
  }, [])

  const login = () => {
    setIsAuthenticated(true)
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(undefined) // Clear the user on logout
  }

  useEffect(() => {
    localStorage.setItem('isAuthenticated', String(isAuthenticated))
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    }
  }, [isAuthenticated, user])

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext
