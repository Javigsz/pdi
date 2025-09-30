import { useState, useContext, useEffect } from 'react'
import { MdOutlineMenu } from 'react-icons/md'
import { BsArrowBarLeft } from 'react-icons/bs'
import { FiltersContext } from '../context/filters'
import { AuthContext } from '../context/authContext'

const SideMenu = () => {
  const [openMenu, setOpenMenu] = useState(false)
  const { order, setOrder } = useContext(FiltersContext)
  const { isLoggedIn, loggedUsername } = useContext(AuthContext)
  const [copiado, setCopiado] = useState(false)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })

  const handleOnChangeSelect = (e) => {
    const newValue = e.target.value
    if (newValue !== order.type) {
      const oldDirection = order.direction
      setOrder({ type: newValue, direction: oldDirection })
    }
  }

  const handleClickOnShare = async () => {
    try {
      // Copiar el enlace al portapapeles
      setCopiado(true) // Cambia el estado si se copió correctamente
      setTimeout(() => setCopiado(false), 2000)
      await navigator.clipboard.writeText('https://pordondeiba-pdi.netlify.app/user/' + loggedUsername)
    } catch (error) {
      console.error('Error al copiar al portapapeles: ', error)
    } finally {
      // Mostrar un mensaje de alerta
      console.log('Enlace copiado al portapapeles')
    }
  }

  const handleCursorMovement = (e) => {
    setCursorPos({
      x: e.clientX + 10,
      y: e.clientY + 10
    })
  }

  useEffect(() => {
    // Escuchar el movimiento del mouse
    window.addEventListener('mousemove', handleCursorMovement)

    // Limpiar el evento cuando el componente se desmonte
    return () => {
      window.removeEventListener('mousemove', handleCursorMovement)
    }
  }, [])

  return (
    <>
      <div
        id='menu'
        className={`min-h-svh bg-[#0f0e17] flex flex-col items-center ${openMenu ? 'min-w-[200px] px-6' : ''} border-r-4 border-white`}
      >
        <div>
          <button
            className={`h-10 w-12 bg-[#0f0e17] text-white p-2 rounded-md flex justify-center items ${openMenu ? 'border-2' : ''} `}
            onClick={() => setOpenMenu(!openMenu)}
          >
            {openMenu && <BsArrowBarLeft size={20} />}
            {!openMenu && <MdOutlineMenu />}
          </button>
        </div>
        {openMenu && (
          <div>
            <h1 className='text-white text-center font-bold my-8'>Filtros PDI</h1>
            <div className='flex flex-col justify-center text-sm'>
              <p className='text-white text-center'>Orden</p>
              <select
                id='sort-type'
                value={order.type}
                className='text-black w-full mx-auto my-3 rounded-md'
                onChange={(e) => handleOnChangeSelect(e)}
              >
                <option value='name'>Nombre</option>
                <option value='added'>Fecha de añadido</option>
              </select>
              <div className='w-3/4 mx-auto'>
                <div className='flex'>
                  <input
                    type='radio'
                    id='asc'
                    name='order'
                    value='asc'
                    checked={order.direction === 'asc'}
                    onChange={(e) => setOrder({ type: order.type, direction: e.target.value })}
                  />
                  <label htmlFor='asc'> Ascendente</label>
                </div>
                <div className='flex my-3'>
                  <input
                    type='radio'
                    id='desc'
                    name='order'
                    value='desc'
                    checked={order.direction === 'desc'}
                    onChange={(e) => setOrder({ type: order.type, direction: e.target.value })}
                  />
                  <label htmlFor='desc'> Descendente</label>
                </div>
              </div>
            </div>
            {isLoggedIn && (
              <>
                <h1 className='text-center font-bold my-8'>Compartir</h1>
                <div
                  className='text-[#f25f4c] flex flex-col justify-center text-center text-sm cursor-pointer hover:underline'
                  onClick={() => handleClickOnShare()}
                >
                  Copiar enlace
                </div>
              </>
            )}
          </div>
        )}
      </div>
      {copiado && (
        <div
          className='absolute px-3 py-1 bg-[#f25f4c] text-white rounded text-sm'
          style={{
            top: `${cursorPos.y}px`,
            left: `${cursorPos.x}px`,
            transform: 'translate(10px, -50%)', // Desplazamos el mensaje a la derecha del cursor
            pointerEvents: 'none' // Evitar que interfiera con otros elementos interactivos
          }}
        >
          ¡Enlace copiado!
        </div>
      )}
    </>
  )
}

export default SideMenu
