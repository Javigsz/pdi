import { useContext } from 'react'
import MainBoard from './Board/MainBoard'

import { DataContext } from '../context/dataContext'

export default function UserPDI ({ username }) {
  const { setUsername, error } = useContext(DataContext)
  // THIS NEEDS TO BE FIXED
  setUsername(username)

  return (
    <>
      {!error && <MainBoard />}
      <p className='h-10 text-xl'>{error}</p>
    </>
  )
}
