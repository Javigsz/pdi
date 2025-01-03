import { useState } from 'react'
import BoardList from './BoardList'
import Column from './Column'

const MainBoard = () => {
  const [selected, setSelected] = useState('Peliculas')
  return (
    <>
      <div id='main-board' className='flex flex-col px-8 w-full bg-[#0f0e17] '>
        <div id='lists' className='flex wrap justify-start'>
          {/* Esto se puede cambiar por un bucle cuando tenga el estado */}
          <BoardList name='Peliculas' selected={selected} setSelected={setSelected} />
          <BoardList name='Series' selected={selected} setSelected={setSelected} />
          <BoardList name='Videojuegos' selected={selected} setSelected={setSelected} />
          <BoardList name='Anime' selected={selected} setSelected={setSelected} />
          <BoardList name='Libros' selected={selected} setSelected={setSelected} />
        </div>
        <div className='bg-[#0f0e17] border-4 border-[#f25f4c] p-4 h-full'>
          <input type='text' placeholder='Buscar' className='fixed bottom-10' />
          <div id='columns' className='flex wrap justify-between'>
            <Column name='Pendientes' selected={selected} />
            <Column name='Viendo' selected={selected} />
            <Column name='Vistas' selected={selected} />
          </div>
        </div>
      </div>
    </>
  )
}

export default MainBoard
