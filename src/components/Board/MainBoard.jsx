import { useState } from 'react'
import BoardList from './BoardList'
import Column from './Column'

const MainBoard = () => {
  const [selected, setSelected] = useState('Peliculas')
  return (
    <>
      <div id='main-board' className='flex flex-col w-full'>
        <div id='lists' className='flex wrap justify-between'>
          {/* Esto se puede cambiar por un bucle cuando tenga el estado */}
          <BoardList name='Peliculas' selected={selected} setSelected={setSelected} />
          <BoardList name='Series' selected={selected} setSelected={setSelected} />
          <BoardList name='Videojuegos' selected={selected} setSelected={setSelected} />
          <BoardList name='Anime' selected={selected} setSelected={setSelected} />
          <BoardList name='Libros' selected={selected} setSelected={setSelected} />
        </div>
        <div id='columns' className='bg-blue-300 p-4 flex wrap justify-between h-full'>
          <Column name='Pendientes' selected={selected} />
          <Column name='Viendo' selected={selected} />
          <Column name='Vistas' selected={selected} />
        </div>
      </div>
    </>
  )
}

export default MainBoard
