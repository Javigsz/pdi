import { createContext, useState, useEffect } from 'react'

const backendURL = import.meta.env.VITE_BACKEND_URL

export const AuthContext = createContext()

export function AuthProvider ({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loggedUsername, setLoggedUsername] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkSession()
  }, [])

  const checkSession = async () => {
    setTimeout(async () => {
      try {
        const response = await fetch(`${backendURL}/api/protected/endpoint`, {
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
      } finally {
        setLoading(false)
      }
    }, 1000) // 1 second delay
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, loggedUsername, setLoggedUsername, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
