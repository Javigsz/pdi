import { useContext, useState } from 'react'
import { AuthContext } from '../context/authContext'

const backendURL = import.meta.env.VITE_BACKEND_URL

const useAuth = () => {
  const { loading, setLoading } = useContext(AuthContext)
  const [error, setError] = useState(null)

  const login = async (username, password) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${backendURL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ username, password })
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Login failed')
      }
      return data
    } catch (err) {
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }

  const register = async (username, password, email) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${backendURL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ username, email, password })
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Registration failed')
      }
      return data
    } catch (err) {
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${backendURL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include' // Include cookies in the request
      })
      if (!response.ok) {
        throw new Error('Logout failed')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { login, register, logout, loading, error, setError }
}

export default useAuth
