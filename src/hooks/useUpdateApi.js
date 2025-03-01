import { useContext } from 'react'
import { AuthContext } from '../context/authContext'

const backendURL = import.meta.env.VITE_BACKEND_URL

const useUpdateApi = () => {
  const { loggedUsername, setLoggedUsername, setIsLoggedIn } = useContext(AuthContext)

  const updateItem = async (apiId, newItem, selected, data, setData) => {
    const newData = structuredClone(data)
    const itemToUpdate = newData[selected].find(i => i.apiId === apiId)
    itemToUpdate.part = newItem.part
    itemToUpdate.season = newItem.season
    itemToUpdate.state = newItem.state
    setData(newData)

    // Create a copy of newItem with the type attribute for the request
    const newItemWithType = { ...newItem, type: selected }

    if (loggedUsername !== 'Invitado') {
      const response = await fetch(`${backendURL}/api/media/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ updateData: newItemWithType })
      })
      const data = await response.json()
      if (!response.ok) {
        if (data.message === 'Token invalido o expirado') {
          window.location.reload()
          setLoggedUsername('')
          setIsLoggedIn(false)
        }
        throw new Error(data.error || 'Updating item failed')
      }
    }
  }

  const deleteItem = async (apiId, selected, data, setData) => {
    const newData = structuredClone(data)
    newData[selected] = newData[selected].filter(i => i.apiId !== apiId)
    setData(newData)

    if (loggedUsername === 'Invitado') return

    try {
      const response = await fetch(`${backendURL}/api/media/delete`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ apiId, type: selected })
      })
      if (!response.ok) {
        if (data.message === 'Token invalido o expirado') {
          window.location.reload()
          setLoggedUsername('')
          setIsLoggedIn(false)
        }
        throw new Error('Failed to delete item from the backend')
      }
      console.log('Item deleted from the backend')
    } catch (error) {
      console.error('Error deleting item:', error)
    }
  }

  const addItem = async (itemToAdd, selected, data, setData) => {
    if (!data[selected].some(myItem => myItem.apiId === itemToAdd.apiId)) {
      setData({ ...data, [selected]: [...data[selected], itemToAdd] })
      if (loggedUsername !== 'Invitado') {
        try {
          const response = await fetch(`${backendURL}/api/media/add`, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemToAdd)
          })
          if (!response.ok) {
            if (data.message === 'Token invalido o expirado') {
              window.location.reload()
              setLoggedUsername('')
              setIsLoggedIn(false)
            }
            throw new Error('Failed to add item to the backend')
          }
          const result = await response.json()
          console.log('Item added to the backend:', result)
        } catch (error) {
          console.error('Error adding item to the backend:', error)
        }
      }
    } else {
      window.alert('Item already exists')
    }
  }

  return { updateItem, deleteItem, addItem }
}

export default useUpdateApi
