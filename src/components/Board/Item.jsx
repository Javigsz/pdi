const Item = ({ name }) => {
  return (
    <>
      <div id='item' className='relative w-[350px] h-[60px] flex items-center m-2 ptbr-2 bg-gray-700 rounded-md'>
        <div id='image' className='w-[50px]'>
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS08JbeYZ8ccPOp4Su1QuQ6xJueP1D-0XFYgA&s' className='rounded-md' alt='' />
        </div>
        <div id='title' className='pl-4 max-w-[200px] max-h-[60px] overflow-hidden'>
          <p className='text-sm opacity-80'>Title</p>
        </div>
        {name === 'Viendo' && (
          <div id='buttons' className='absolute right-1 top-1/2 transform -translate-y-1/2'>
            <input type='number' className='w-8 rounded-md' />
          </div>
        )}
      </div>
    </>
  )
}

export default Item
