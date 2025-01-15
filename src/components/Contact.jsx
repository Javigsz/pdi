import { useLocation } from 'wouter'

const Contact = () => {
  const [, setLocation] = useLocation()
  const handleClick = () => {
    setLocation('/')
  }
  return (
    <div className='grid grid-cols-1 place-content-center min-h-[50vh] w-1/2 justify-items-center text-center gap-4'>
      <h1 className='text-2xl'>Contacto</h1>
      <ul>
        <li>
          <a
            className='text-white hover:text-[#f25f4c]'
            href='https://github.com/javigsz'
            target='_blank'
            rel='noreferrer'
          >
            Github
          </a>
        </li>
        <li>
          <a
            className='text-white hover:text-[#f25f4c]'
            href='https://www.linkedin.com/in/javigsz/'
            target='_blank'
            rel='noreferrer'
          >
            Linkedin
          </a>
        </li>
        <li>
          <a
            className='text-white hover:text-[#f25f4c]'
            href='https://mail.google.com/mail/u/0/#inbox'
            target='_blank'
            rel='noreferrer'
          >
            javigs.it@gmail.com
          </a>
        </li>
      </ul>
      <button
        onClick={() => handleClick()}
        className='bg-[#f25f4c] text-white p-2 rounded-md w-2/5'
      >
        Volver
      </button>
    </div>
  )
}

export default Contact
