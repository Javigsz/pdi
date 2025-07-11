import { LinearProgress } from '@mui/material'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext'

export default function Loading () {
  const { loading } = useContext(AuthContext)
  return (
    <div className={`${loading ? 'opacity-100 z-50' : 'opacity-0 -z-50'} fixed top-[100px] left-0 bottom-0 right-0 
        bg-[#16142f] text-white flex items-center justify-center transition`}
    >
      <div className='flex flex-col items-center'>
        <h1 className='text-3xl font-bold'>PDI</h1>
        <h1 className='text-xl font-bold text-button mb-10'>Loading...</h1>
        <LinearProgress sx={{
          width: 265,
          height: 10,
          backgroundColor: '#f25f4c',
          '& .MuiLinearProgress-bar': {
            backgroundColor: '#FFFFFF'
          }
        }}
        />
      </div>
    </div>
  )
}
