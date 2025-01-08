import { useState } from 'react'
import { MdOutlineMenu } from 'react-icons/md'
import { BsArrowBarLeft } from 'react-icons/bs'

const SideMenu = () => {
  const [openMenu, setOpenMenu] = useState(false)
  return (
    <>
      <div id='menu' className={`bg-[#0f0e17] flex flex-col items-center ${openMenu ? 'min-w-[200px]' : 'min-w-[60px]'} h-svh border-r-4 border-[white] rounded-md transition-[min-width] duration-500`}>
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
            <div>
              <p className='text-white text-center my-8'>Orden</p>
              <p className='text-white text-center my-8'>Fecha</p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default SideMenu
