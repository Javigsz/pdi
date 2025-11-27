import { LinearProgress } from '@mui/material'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext'

export default function Loading () {
  const { loading } = useContext(AuthContext)
  return (
    <>
      <div
        className={`${loading ? '' : 'opacity-0 -z-50'} font-roboto-slab fixed top-0 left-0 bottom-0 right-0 
       text-white flex items-center justify-center transition`}
        style={{ background: 'linear-gradient(to right, #16142f, #0f1a4e)' }}
      >
        <div className='flex flex-col items-center'>
          <h1 className='text-4xl'>PDI</h1>
          <h1 className='text-xl text-button mb-10'>Loading...</h1>
          <LinearProgress sx={{
            width: 265,
            height: 4,
            backgroundColor: '#f25f4c',
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#FFFFFF'
            }
          }}
          />
        </div>
      </div>
    </>
  )
}
