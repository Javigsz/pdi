import { useState, useEffect } from 'react'
import { Oval } from 'react-loader-spinner'

const ImageLoader = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const img = document.createElement('img')
    img.src = src
    img.onload = () => setLoaded(true)
  }, [src])

  return (
    <>
      {loaded
        ? (
          <img src={src} alt={alt} className='rounded-md w-full h-full' />
          )
        : (
          <div className='flex items-center justify-center h-full w-full'>
            <Oval color='#f25f4c' height={40} width={40} secondaryColor='white' />
          </div>
          )}
    </>
  )
}

export default ImageLoader
