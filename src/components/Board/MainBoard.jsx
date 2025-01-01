import BoardList from './BoardList'

const MainBoard = () => {
  return (
    <>
      <div id='main-board' className='w-full flex justify-around'>
        <BoardList name='Peliculas' />
        <BoardList name='Series' />
        <BoardList name='Videojuegos' />
        <BoardList name='Anime' />
        <BoardList name='Libros' />
      </div>
    </>
  )
}

export default MainBoard
