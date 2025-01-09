import { useState, useContext } from 'react'
import BoardList from './BoardList'
import Column from './Column'
import SideMenu from '../SideMenu'
import { TbEyeCheck } from 'react-icons/tb'
import { FaEye, FaRegEyeSlash } from 'react-icons/fa'
import { namesArray } from '../../utils/selectedArray'
import { FiltersContext } from '../../context/filters'

const MainBoard = ({ data, setData }) => {
  const [selected, setSelected] = useState('Películas')
  const { searchText, setSearchText } = useContext(FiltersContext)
  return (
    <>
      <SideMenu />
      <div id='main-board' className='flex flex-col w-full bg-[#161422]'>
        <div id='lists' className='flex wrap justify-start'>
          {/* Esto se puede cambiar por un bucle cuando tenga el estado */}
          <BoardList name='Películas' selected={selected} setSelected={setSelected} />
          <BoardList name='Series' selected={selected} setSelected={setSelected} />
          <BoardList name='Videojuegos' selected={selected} setSelected={setSelected} />
          <BoardList name='Animación' selected={selected} setSelected={setSelected} />
          <BoardList name='Libros' selected={selected} setSelected={setSelected} />
        </div>
        <div className='relative border-4 border-[#f25f4c] bg-[#161422] bg-no-repeat bg-cover p-4 h-full'>
          <input
            type='text'
            placeholder='Buscar'
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            className={`z-40 mt-4 ml-8 text-black ${searchText ? 'bg-[#f25f4c] text-white' : ''} rounded-md`}
          />
          <div id='columns' className='flex wrap justify-between'>
            <Column name={namesArray[selected][0]} icon={<FaRegEyeSlash color='#f25f4c' size={20} />} selected={selected} data={data} setData={setData} />
            <Column name={namesArray[selected][1]} icon={<FaEye color='#f25f4c' size={20} />} selected={selected} data={data} setData={setData} />
            <Column name={namesArray[selected][2]} icon={<TbEyeCheck color='#f25f4c' size={20} />} selected={selected} data={data} setData={setData} />
          </div>
        </div>
      </div>
    </>
  )
}

export default MainBoard
