import { createContext, useState, useEffect, useContext } from 'react'
import { AuthContext } from './authContext'
import { data } from '../mocks/data'
import { useLocation } from 'wouter'

const emptyData = {
  Películas: [],
  Series: [],
  Videojuegos: [],
  Animación: [],
  Libros: []
}

const backendURL = import.meta.env.VITE_BACKEND_URL

const transformData = (realData) => {
  const transformedData = {
    Películas: [],
    Series: [],
    Videojuegos: [],
    Animación: [],
    Libros: []
  }

  realData.forEach(item => {
    const { type, ...rest } = item
    if (!transformedData[type]) {
      transformedData[type] = []
    }
    transformedData[type].push(rest)
  })

  return transformedData
}

const DataContext = createContext()

const DataProvider = ({ children }) => {
  const [tablesData, setTablesData] = useState(emptyData)
  const { loggedUsername } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('')
  const [error, setError] = useState(null)
  const [pathname] = useLocation()

  useEffect(() => {
    const fetchData = async () => {
      if (username !== '' && pathname.includes('user')) {
        console.log('Fetching data for route user:', username)
        try {
          const response = await fetch(`${backendURL}/api/user/${username}`, {
            // credentials: 'include'
          }); if (!response.ok) {
            throw new Error('Failed to fetch data')
          }
          const realData = await response.json()
          const transformedData = transformData(realData)
          setTablesData({ ...transformedData })
        } catch (error) {
          console.error('Error fetching data:', error)
          setError(error.message)
        } finally {
          setLoading(false)
        }
      } else if (loggedUsername === 'Invitado') {
        console.log('Fetching data for guest user')
        setTablesData(data)
      } else if (loggedUsername) {
        setTablesData({ ...emptyData })
        console.log('Fetching data for logged user:', loggedUsername)
        try {
          const response = await fetch(`${backendURL}/api/media/fetch`, {
            credentials: 'include'
          }); if (!response.ok) {
            throw new Error('Failed to fetch data')
          }
          const realData = await response.json()
          const transformedData = transformData(realData)
          if (transformedData !== tablesData) setTablesData({ ...transformedData })
        } catch (error) {
          console.error('Error fetching data:', error)
          setError(error.message)
        } finally {
          setLoading(false)
        }
      }
    }
    fetchData()
  }, [loggedUsername, username])

  // const fetchData = async (username, url) => {
  //   console.log('Fetching data for user:', username)
  //   try {
  //     const response = await fetch(url, {
  //       credentials: 'include'
  //     }); if (!response.ok) {
  //       throw new Error('Failed to fetch data')
  //     }
  //     const realData = await response.json()
  //     console.log(realData)
  //     const transformedData = transformData(realData)
  //     setTablesData(transformedData)
  //   } catch (error) {
  //     console.error('Error fetching data:', error)
  //     setError(error.message)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  // useEffect(() => {
  //   console.log('CAMBIO USERNAME')
  //   setLoading(true)
  //   setError(null)
  //   setTablesData({
  //     Películas: [],
  //     Series: [],
  //     Videojuegos: [],
  //     Animación: [],
  //     Libros: []
  //   })
  //   if (username === 'Invitado') {
  //     setTablesData(data)
  //     return
  //   }

  //   if (loggedUsername !== '' && username === '') {
  //     fetchData(loggedUsername, `${backendURL}/api/media/fetch`)
  //     return
  //   }
  //   fetchData(username, `${backendURL}/api/user/${username}`)
  // }, [username])

  // useEffect(() => {
  //   if (username !== '' || loggedUsername === '') return
  //   setLoading(true)
  //   setError(null)
  //   setTablesData({
  //     Películas: [],
  //     Series: [],
  //     Videojuegos: [],
  //     Animación: [],
  //     Libros: []
  //   })

  //   if (loggedUsername === 'Invitado') {
  //     setTablesData(data)
  //     return
  //   }

  //   fetchData(loggedUsername, `${backendURL}/api/media/fetch`)
  // }, [loggedUsername])

  return <DataContext.Provider value={{ tablesData, setTablesData, loading, setUsername, error }}>{children}</DataContext.Provider>
}

export { DataContext, DataProvider }
