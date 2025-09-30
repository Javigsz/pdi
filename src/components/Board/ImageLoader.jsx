import { useState, useEffect } from 'react'
import { Oval } from 'react-loader-spinner'
import LazyLoad from 'react-lazyload'

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
          <LazyLoad offset={100} once className='w-full h-full'>
            <img src={src} alt={alt} className='rounded-md w-full h-full' />
          </LazyLoad>
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
