import { useState } from 'react'
import BoardList from './BoardList'
import Column from './Column'
import { TbEyeCheck } from 'react-icons/tb'
import { FaEye, FaRegEyeSlash } from 'react-icons/fa'

const MainBoard = ({ data, setData }) => {
  const [selected, setSelected] = useState('Peliculas')
  return (
    <>
      <div id='main-board' className='flex flex-col px-12 w-full bg-[#161422] '>
        <div id='lists' className='flex wrap justify-start'>
          {/* Esto se puede cambiar por un bucle cuando tenga el estado */}
          <BoardList name='Peliculas' selected={selected} setSelected={setSelected} />
          <BoardList name='Series' selected={selected} setSelected={setSelected} />
          <BoardList name='Videojuegos' selected={selected} setSelected={setSelected} />
          <BoardList name='Anime' selected={selected} setSelected={setSelected} />
          <BoardList name='Libros' selected={selected} setSelected={setSelected} />
        </div>
        <div className='relative bg-[#161422] border-4 border-[#f25f4c] p-4 h-full'>
          <input type='text' placeholder='Buscar' className='fixed bottom-10 z-40' />
          <div id='columns' className='flex wrap justify-between'>
            <Column name='Pendientes' icon={<FaRegEyeSlash color='#f25f4c' size={20} />} selected={selected} data={data} setData={setData} />
            <Column name='Viendo' icon={<FaEye color='#f25f4c' size={20} />} selected={selected} data={data} setData={setData} />
            <Column name='Vistas' icon={<TbEyeCheck color='#f25f4c' size={20} />} selected={selected} data={data} setData={setData} />
          </div>
        </div>
      </div>
    </>
  )
}

export default MainBoard
