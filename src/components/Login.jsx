import { useState, useContext, useEffect } from 'react'
import { useLocation } from 'wouter'
import { AuthContext } from '../context/authContext'
import useAuth from '../hooks/useAuth'

const Login = () => {
  const [registing, setRegisting] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [email, setEmail] = useState('')
  const { login, register, error, setError } = useAuth()
  const { setIsLoggedIn, setLoggedUsername } = useContext(AuthContext)
  const [, setLocation] = useLocation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (registing) {
      const result = await register(username, password, email)
      if (result) {
        setRegisting(false)
        setUsername('')
        setPassword('')
        setEmail('')
        setError(null)
        setSuccessMessage('Usuario registrado correctamente')
      }
    } else {
      const result = await login(username, password)
      if (result) {
        setLoggedUsername(username)
        setIsLoggedIn(true)
      }
    }
  }

  const handleChangeRegisting = (value) => {
    setRegisting(value)
    setUsername('')
    setPassword('')
    setEmail('')
    setError(null)
    setSuccessMessage(null)
  }

  const handleClickGuest = () => {
    setIsLoggedIn(true)
    setLoggedUsername('Invitado')
  }

  useEffect(() => {
    if (error) {
      setSuccessMessage(null)
    }
  }, [error])

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='font-roboto-slab mt-12 border-top-4 border-white bg-[#0f0e17] p-4 rounded-md max-w-xs'>
        <form id='login-form' onSubmit={handleSubmit} className='flex flex-col items-center mx-auto border-2 px-14 pb-14 rounded-sm'>
          <h1 className='text-2xl text-white text-center py-8'>{registing ? 'Registro' : 'Inicio de Sesión'}</h1>
          <label htmlFor='username'>Nombre Usuario:</label>
          <input type='text' id='username' name='username' required className='border-2 text-black' value={username} onChange={(e) => setUsername(e.target.value)} />

          <label htmlFor='password'>Contraseña:</label>
          <input type='password' id='password' name='password' required className='border-2 text-black' value={password} onChange={(e) => setPassword(e.target.value)} />

          {registing && <label htmlFor='email'>Email:</label>}
          {registing && <input type='email' id='email' name='email' required className='border-2 text-black' value={email} onChange={(e) => setEmail(e.target.value)} />}

          {error && <p className='text-red-500 text-center w-full flex-shrink-0'>{error}</p>}
          {successMessage && <p className='text-green-500 text-center w-full flex-shrink-0'>{successMessage}</p>}
          <button
            type='submit'
            className='disabled:hidden bg-[#f25f4c] text-white p-2 rounded-md mt-8 w-full hover:shadow-white hover:shadow-sm transition'
          >
            {registing ? 'Registrar' : 'Login'}
          </button>
          <div className='w-full'>
            <button
              type='button'
              disabled={!registing}
              onClick={() => handleChangeRegisting(false)}
              className='disabled:hidden bg-[#f25f4c] text-white p-2 rounded-md mt-4 w-full hover:shadow-white hover:shadow-sm'
            >
              ← Iniciar sesión
            </button>

            {!registing &&
              <button
                onClick={handleClickGuest}
                className='bg-[#f25f4c] text-white p-2 rounded-md mt-4 w-full hover:shadow-white hover:shadow-sm'
              >
                Iniciar como invitado
              </button>}
            <button
              type='button'
              disabled={registing}
              onClick={() => handleChangeRegisting(true)}
              className='disabled:hidden bg-[#f25f4c] text-white p-2 rounded-md mt-4 w-full hover:shadow-white hover:shadow-sm'
            >
              Registro →
            </button>
          </div>

        </form>
      </div>
      <div className='flex flex-col items-center justify-center mt-8 p-4 max-w-[80%]'>
        <h1 className='text-4xl font-bold'>¿QUÉ ES PDI?</h1>
        <button
          className='p-2 text-2xl font-bold w-16 mt-4 mb-8 bg-[#f25f4c] text-white rounded-md hover:shadow-white hover:shadow-sm'
          onClick={() => window.scrollTo({ top: 700, behavior: 'smooth' })}
        > ↓
        </button>
        <p className='text-center text-sm md:mx-20'>¿No estás cansad@ de apuntar todas tus series y películas pendientes en un mísero bloc de notas?
          ¿No quieres tener cinco webs distintas para buscar información sobre tus series favoritas?
          <strong> PDI</strong> es una aplicación agradable, simple y rápida que te permite llevar un registro de tus series, películas favoritas y más.
        </p>
        <div className='flex flex-col justify-center items-center max-w-[80%]'>
          <div className='md:mx-20 my-10 flex flex-col justify-center items-center'>
            <div className='flex items-center justify-center hover:scale-110 transition-all hover:z-20'>
              <video className='hover:border-2 hover:border-white' src='/pdi1.mp4' autoPlay loop muted alt='Video' />
            </div>
            <p className='text-center text-sm mt-2'>Busca y guarda una nueva serie/película/etc. y guárdala para ti.</p>
          </div>
          <div className='md:mx-20 my-10 flex flex-col justify-center items-center'>
            <div className='flex items-center justify-center hover:scale-110 transition-all hover:z-20'>
              <video className='hover:border-2 hover:border-white' src='/pdi2.mp4' autoPlay loop muted alt='Video' />
            </div>
            <p className='text-center text-sm mt-2'> Cambia el estado de tus series o busca más información sobre ellas.</p>
          </div>
        </div>
      </div>
      <div className='flex flex-col items-center justify-center max-w-[80%]'>
        <p>Si quieres saber más</p>
        <div className='flex items-center justify-center gap-2 mt-2'>
          <button
            className='bg-[#f25f4c] text-white p-2 rounded-md w-full hover:shadow-white hover:shadow-sm'
            onClick={() => setLocation('/contact')}
          >
            Contacto
          </button>
          <button
            className='bg-[#f25f4c] text-white p-2 rounded-md w-full hover:shadow-white hover:shadow-sm'
            onClick={() => setLocation('/help')}
          >
            Ayuda
          </button>
        </div>
        <button
          className='p-6 bg-[#f25f4c] text-white rounded-md mt-4 w-full hover:shadow-white hover:shadow-sm mb-10'
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Iniciar Sesión ↑
        </button>
      </div>
    </div>
  )
}

export default Login
