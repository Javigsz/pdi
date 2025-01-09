import { useLocation } from 'wouter'

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const [, setLocation] = useLocation()
  const handleClickContact = () => {
    setLocation('/contact')
  }
  const handleClickHelp = () => {
    setLocation('/help')
  }
  return (
    <>
      <div className='bg-[#0f0e17] h-18 p-4 flex border-b-4 border-[white] justify-between items-start'>
        <div>
          {isLoggedIn && (
            <p className='border-[white] text-xs p-[4px] hover:text-[#f25f4c]'>Perfil: Invitado</p>
          )}
          <button disabled={!isLoggedIn} onClick={() => setIsLoggedIn(false)} className='border-[white] text-xs p-[4px] hover:text-[#f25f4c]'>
            {isLoggedIn ? 'Cerrar Sesion' : 'Iniciar Sesion'}
          </button>
        </div>
        <div className='flex flex-col items-center cursor-pointer hover:text-[#f25f4c]' onClick={() => setLocation('/')}>
          <h1 className='text-4xl'>PDI</h1>
          <h1>Por dónde iba?</h1>
        </div>
        <div className='flex flex-col items-start'>
          <button className='border-[white] text-xs p-[4px] hover:text-[#f25f4c]' onClick={() => handleClickContact()}>Contacto</button>
          <button className='border-[white] text-xs p-[4px] hover:text-[#f25f4c]' onClick={() => handleClickHelp()}>Ayuda</button>
        </div>
      </div>
    </>
  )
}

export default Header
