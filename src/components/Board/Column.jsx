const Column = ({ name, selected }) => {
  return (
    <>
      <div className='w-full border-4 border-black h-12'>
        <h1 className='text-2xl text-center'>{name}</h1>
        <div>
          soy un {selected}
        </div>
      </div>
    </>
  )
}

export default Column
