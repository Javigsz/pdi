import { useState, useContext, useEffect } from 'react'
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
    <>
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
            className='disabled:hidden bg-[#f25f4c] text-white p-2 rounded-md mt-4 w-full'
          >
            {registing ? 'Registrar' : 'Login'}
          </button>
          <div className='flex '>
            <button
              type='button'
              disabled={!registing}
              onClick={() => handleChangeRegisting(false)}
              className='disabled:hidden bg-[#f25f4c] text-white p-2 rounded-md mt-4 w-full'
            >
              Iniciar sesión
            </button>
            <button
              type='button'
              disabled={registing}
              onClick={() => handleChangeRegisting(true)}
              className='disabled:hidden bg-[#f25f4c] text-white p-2 rounded-md mt-4'
            >
              Registro
            </button>
          </div>
          <button
            onClick={handleClickGuest}
            className='bg-[#f25f4c] text-white p-2 rounded-md mt-4 w-full'
          >
            Iniciar como invitado
          </button>
        </form>
      </div>
    </>
  )
}

export default Login
