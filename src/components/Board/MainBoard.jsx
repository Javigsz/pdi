import { useContext } from 'react'
import BoardList from './BoardList'
import Column from './Column'
import SideMenu from '../SideMenu'
import { TbEyeCheck } from 'react-icons/tb'
import { FaEye, FaRegEyeSlash } from 'react-icons/fa'
import { namesArray } from '../../utils/selectedArray'
import { FiltersContext } from '../../context/filters'

const MainBoard = ({ data, setData }) => {
  const { searchText, setSearchText, selected } = useContext(FiltersContext)
  return (
    <>
      <SideMenu />
      <div id='main-board' className='flex flex-col bg-[#16142f] w-full h-full overflow-auto'>
        <div id='lists' className='flex wrap justify-start'>
          {/* Esto se puede cambiar por un bucle cuando tenga el estado */}
          <BoardList name='Películas' />
          <BoardList name='Series' />
          <BoardList name='Videojuegos' />
          <BoardList name='Animación' />
          <BoardList name='Libros' />
        </div>
        <div className='border-t-4 border-[#f25f4c] bg-[#16142f] px-20 h-full'>
          <input
            type='text'
            placeholder='Buscar'
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            className={`z-40 mt-4 ml-8 text-black ${searchText ? 'bg-[#f25f4c] text-white' : ''} rounded-md`}
          />
          <div id='columns' className='flex justify-between min-w-80'>
            <Column name={namesArray[selected][0]} icon={<FaRegEyeSlash color='#f25f4c' size={20} />} data={data} setData={setData} />
            <Column name={namesArray[selected][1]} icon={<FaEye color='#f25f4c' size={20} />} data={data} setData={setData} />
            <Column name={namesArray[selected][2]} icon={<TbEyeCheck color='#f25f4c' size={20} />} data={data} setData={setData} />
          </div>
        </div>
      </div>
    </>
  )
}

export default MainBoard
