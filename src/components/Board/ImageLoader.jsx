import { useState } from 'react'
import { Oval } from 'react-loader-spinner'
import LazyLoad from 'react-lazyload'

const ImageLoader = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false)

  return (
    <LazyLoad offset={200} once className='w-full h-full'>
      <div className='w-full h-full relative'>
        {!loaded && (
          <div className='absolute inset-0 flex items-center justify-center bg-white bg-opacity-10 z-10'>
            <Oval color='#f25f4c' height={40} width={40} secondaryColor='white' />
          </div>
        )}
        <img
          src={src}
          alt={alt}
          className='rounded-md w-full h-full'
          style={loaded ? {} : { visibility: 'hidden' }}
          onLoad={() => setLoaded(true)}
        />
      </div>
    </LazyLoad>
  )
}

export default ImageLoader
