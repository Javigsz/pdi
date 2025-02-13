import { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

export function AuthProvider ({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loggedUsername, setLoggedUsername] = useState('')

  useEffect(() => {
    checkSession()
  }, [])

  const checkSession = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/protected/endpoint', {
        method: 'GET',
        credentials: 'include'
      })

      if (response.status === 401) {
        setIsLoggedIn(false)
      } else {
        const data = await response.json()
        setLoggedUsername(data.username)
        setIsLoggedIn(true)
      }
    } catch (error) {
      console.error('Error al verificar la sesión:', error)
      setIsLoggedIn(false)
    }
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, loggedUsername, setLoggedUsername }}>
      {children}
    </AuthContext.Provider>
  )
}
