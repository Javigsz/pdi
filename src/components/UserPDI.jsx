import { useState, useEffect } from 'react'
import { data } from '../mocks/data'
import MainBoard from './Board/MainBoard'

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

export default function UserPDI ({ username }) {
  const [tablesData, setTablesData] = useState(emptyData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      if (username === 'Invitado') {
        setTablesData(data)
      } else if (username) {
        setTablesData(emptyData)
        console.log('Fetching data for user:', username)
        try {
          const response = await fetch(`${backendURL}/api/user/${username}`, {
            // credentials: 'include'
          }); if (!response.ok) {
            throw new Error('Failed to fetch data')
          }
          const realData = await response.json()
          const transformedData = transformData(realData)
          setTablesData(transformedData)
          console.log(tablesData)
        } catch (error) {
          console.error('Error fetching data:', error)
          setError('No se encontraron datos para el usuario ' + username)
        } finally {
          setLoading(false)
        }
      }
    }
    fetchData()
  }, [username])
  return (
    <>
      {loading
        ? (
          <p>Loading...</p>
          )
        : (
          <>
            {!error && <MainBoard data={tablesData} />}
            <p className='h-10 text-xl'>{error}</p>
          </>
          )}
    </>
  )
}
