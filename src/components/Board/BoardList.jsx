const BoardList = ({ name }) => {
  return (
    <>
      <div className='border-4 border-black'>
        <h1 className='text-4xl text-center'>{name}</h1>
        <div className='w-[250px] h-[50px] border-4 border-orange-400'>
          hola
        </div>
        <div className='w-[250px] h-[50px] border-4 border-orange-400'>
          hola
        </div>
        <div className='w-[250px] h-[50px] border-4 border-orange-400'>
          hola
        </div>
        <div className='w-[250px] h-[50px] border-4 border-orange-400'>
          hola
        </div>
      </div>
    </>
  )
}

export default BoardList
