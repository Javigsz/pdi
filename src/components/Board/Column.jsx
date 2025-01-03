import Item from './Item'

const Column = ({ name }) => {
  return (
    <>
      <div className='w-full h-full'>
        <div className='flex justify-evenly my-8'>
          <h1 className='pl-20 text-2xl text-center font-bold'>{name}</h1>
          <button className='pr-12 text-2xl'>+</button>
        </div>
        <div className='flex flex-col items-center'>
          {/* Se puede eliminar el prop propagation cuando tenga el estado */}
          <Item name={name} />
          <Item name={name} />
          <Item name={name} />
        </div>
      </div>
    </>
  )
}

export default Column
