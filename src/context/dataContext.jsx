import { createContext, useState, useEffect, useContext } from 'react'
import { AuthContext } from './authContext'
import { data } from '../mocks/data'

const emptyData = {
  Películas: [],
  Series: [],
  Videojuegos: [],
  Animación: [],
  Libros: []
}

const backendURL = import.meta.env.VITE_BACKEND_URL

const transformData = (realData) => {
  const transformedData = emptyData

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

  useEffect(() => {
    const fetchData = async () => {
      if (loggedUsername === 'Invitado') {
        setTablesData(data)
      } else if (loggedUsername) {
        setTablesData(emptyData)
        console.log('Fetching data for user:', loggedUsername)
        try {
          const response = await fetch(`${backendURL}/api/media/fetch`, {
            credentials: 'include'
          }); if (!response.ok) {
            throw new Error('Failed to fetch data')
          }
          const realData = await response.json()
          const transformedData = transformData(realData)
          setTablesData(transformedData)
        } catch (error) {
          console.error('Error fetching data:', error)
        } finally {
          setLoading(false)
        }
      }
    }
    fetchData()
  }, [loggedUsername])

  return <DataContext.Provider value={{ tablesData, setTablesData, loading }}>{children}</DataContext.Provider>
}

export { DataContext, DataProvider }
