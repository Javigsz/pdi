import { useState, useContext } from 'react'
import { MdOutlineMenu } from 'react-icons/md'
import { BsArrowBarLeft } from 'react-icons/bs'
import { FiltersContext } from '../context/filters'

const SideMenu = () => {
  const [openMenu, setOpenMenu] = useState(false)
  const { order, setOrder } = useContext(FiltersContext)

  const handleOnChangeSelect = (e) => {
    const oldDirection = order.direction
    setOrder({ type: e.target.value, direction: oldDirection })
  }
  return (
    <>
      <div id='menu' className={`bg-[#0f0e17] flex flex-col items-center ${openMenu ? 'min-w-auto px-6' : ''} border-r-4 min-h-svh border-white rounded-md`}>
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
              <select id='sort-type' defaultValue={order.type} className='text-black w-full mx-auto my-3 rounded-md' onChange={(e) => handleOnChangeSelect(e)}>
                <option value='name'>Nombre</option>
                <option value='added'>Fecha de añadido</option>
              </select>
              <div className='w-3/4 mx-auto'>
                <div className='flex'>
                  <input type='radio' id='asc' name='order' value='asc' checked={order.direction === 'asc'} onChange={(e) => setOrder({ type: order.type, direction: e.target.value })} />
                  <label htmlFor='asc'> Ascendente</label>
                </div>
                <div className='flex my-3'>
                  <input type='radio' id='desc' name='order' value='desc' checked={order.direction === 'desc'} onChange={(e) => setOrder({ type: order.type, direction: e.target.value })} />
                  <label htmlFor='desc'> Descendente</label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default SideMenu
