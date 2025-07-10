import { useContext } from 'react'
import BoardList from './BoardList'
import Column from './Column'
import SideMenu from '../SideMenu'
import { TbEyeCheck } from 'react-icons/tb'
import { FaEye, FaRegEyeSlash } from 'react-icons/fa'
import { namesArray } from '../../utils/selectedArray'
import { FiltersContext } from '../../context/filters'
import { useLocation, Link } from 'wouter'
import { AuthContext } from '../../context/authContext'

const MainBoard = ({ data }) => {
  const { searchText, setSearchText, selected } = useContext(FiltersContext)
  const [pathname] = useLocation()
  const { isLoggedIn } = useContext(AuthContext)
  const username = pathname.split('/')[2]

  return (
    <>
      <SideMenu />
      <div id='main-board' className=' bg-[#16142f] h-full w-full'>
        {username && (
          <div className='flex items-center justify-center text-white h-10 font-bold'>
            Estás viendo el PDI de {username}.
            {isLoggedIn &&
              <>
                <Link href='/'><span className='text-orange-500'> Click aqui </span></Link>
                <p>para volver al tuyo.</p>
              </>}
          </div>
        )}
        <div id='lists' className='flex flex-wrap justify-evenly border-t-4 border-[#f25f4c]'>
          {/* Esto se puede cambiar por un bucle */}
          <BoardList name='Películas' />
          <BoardList name='Series' />
          <BoardList name='Videojuegos' />
          <BoardList name='Animación' />
          <BoardList name='Libros' />
        </div>
        <div className='border-t-4 border-[#f25f4c] bg-[#16142f] px-6 md:px-20 h-full'>
          <input
            type='text'
            placeholder='Buscar'
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            className={`z-40 mt-4 mx-4 text-black ${searchText ? 'bg-[#f25f4c] text-white' : ''} rounded-md`}
          />
          <div id='columns' className='flex flex-wrap md:flex-nowrap justify-between'>
            <Column
              data={data}
              name={namesArray[selected][0]}
              icon={<FaRegEyeSlash color='#f25f4c' size={20} />}
            />
            <Column
              data={data}
              name={namesArray[selected][1]}
              icon={<FaEye color='#f25f4c' size={20} />}
            />
            <Column
              data={data}
              name={namesArray[selected][2]}
              icon={<TbEyeCheck color='#f25f4c' size={20} />}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default MainBoard
