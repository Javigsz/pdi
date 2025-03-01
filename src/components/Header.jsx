import { useLocation } from 'wouter'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import useAuth from '../hooks/useAuth'

const Header = () => {
  const [, setLocation] = useLocation()
  const { isLoggedIn, setIsLoggedIn, loggedUsername, setLoggedUsername } =
    useContext(AuthContext)
  const { logout } = useAuth()

  const handleClickContact = () => {
    setLocation('/contact')
  }

  const handleClickHelp = () => {
    setLocation('/help')
  }

  const handleLogout = async () => {
    if (loggedUsername !== 'Invitado') {
      await logout()
    }
    setIsLoggedIn(false)
    setLoggedUsername('')
  }

  return (
    <>
      <div className='bg-[#0f0e17] h-18 p-4 flex border-b-4 border-[white] justify-between items-start'>
        <div>
          {isLoggedIn && (
            <p className='border-[white] text-xs p-[4px] hover:text-[#f25f4c]'>
              Perfil: {loggedUsername}
            </p>
          )}
          <button
            disabled={!isLoggedIn}
            onClick={handleLogout}
            className='border-[white] text-xs p-[4px] hover:text-[#f25f4c]'
          >
            {isLoggedIn ? 'Cerrar Sesion' : 'Iniciar Sesion'}
          </button>
        </div>
        <div
          className='flex flex-col items-center cursor-pointer hover:text-[#f25f4c]'
          onClick={() => setLocation('/')}
        >
          <h1 className='text-4xl'>PDI</h1>
          <h1>Por dónde iba?</h1>
        </div>
        <div className='flex flex-col items-start'>
          <button
            className='border-[white] text-xs p-[4px] hover:text-[#f25f4c]'
            onClick={handleClickContact}
          >
            Contacto
          </button>
          <button
            className='border-[white] text-xs p-[4px] hover:text-[#f25f4c]'
            onClick={handleClickHelp}
          >
            Ayuda
          </button>
        </div>
      </div>
    </>
  )
}

export default Header
