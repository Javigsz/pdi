const Header = () => {
  return (
    <>
      <div className='bg-[#0f0e17] h-18 p-4 flex border-b-4 border-[white] justify-between items-start'>
        <div>
          <button className='border-[white] text-xs p-[4px] hover:text-[#f25f4c]'>Cerrar Sesión</button>
        </div>
        <div className='flex flex-col items-center'>
          <h1 className='text-4xl'>PDI</h1>
          <h1>Por dónde iba?</h1>
        </div>
        <div>
          <button className='border-[white] border-r text-xs p-[4px] hover:text-[#f25f4c]'>Contacto</button>
          <button className='border-[white] text-xs p-[4px] hover:text-[#f25f4c]'>Ayuda</button>
        </div>
      </div>
    </>
  )
}

export default Header
