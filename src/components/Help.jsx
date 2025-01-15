import { useLocation } from 'wouter'

const Help = () => {
  const [, setLocation] = useLocation()

  const handleClick = () => {
    setLocation('/')
  }

  return (
    <div className='grid grid-cols-1 place-content-center min-h-[50vh] w-1/2 justify-items-center text-center gap-4 mb-28'>
      <h1 className='text-2xl'>Ayuda</h1>
      <p>Página en desarrollo que permite realizar un seguimiento de diversas formas de entretenimiento.</p>
      <p className='text-2xl'>APIs utilizadas:</p>
      <ul className='flex flex-col w-1/2 space-y-2'>
        <li
          className='flex justify-between w-full'
        >
          Series y películas:
          <a
            target='_blank'
            rel='noreferrer'
            className='text-white hover:text-[#f25f4c]'
            href='https://www.themoviedb.org/documentation/api'
          >
            <u>TMDB</u>
          </a>
        </li>
        <li
          className='flex justify-between w-full'
        >
          Videojuegos:
          <a
            target='_blank'
            rel='noreferrer'
            className='text-white hover:text-[#f25f4c]'
            href='https://rawg.io/apidocs'
          >
            <u>RAWG</u>
          </a>
        </li>
        <li
          className='flex justify-between w-full'
        >
          Animacion:
          <a
            target='_blank'
            rel='noreferrer'
            className='text-white hover:text-[#f25f4c]'
            href='https://kitsu.docs.apiary.io/#reference/0/introduction'
          >
            <u>Kitsu</u>
          </a>
        </li>
        <li
          className='flex justify-between w-full'
        >
          Libros:
          <a
            target='_blank'
            rel='noreferrer'
            className='text-white hover:text-[#f25f4c]'
            href='https://www.opensearch.org/docs/latest/'
          >
            <u>OpenSearch</u>
          </a>
        </li>
      </ul>
      <button onClick={handleClick} className='bg-[#f25f4c] text-white p-2 rounded-md w-1/2'>Volver</button>
    </div>
  )
}

export default Help
