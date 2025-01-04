import { useState } from 'react'

const Item = ({ item }) => {
  const [partValue, setPartValue] = useState(item.part)

  const handleInputChange = (e) => {
    setPartValue(e.target.value)
    console.log(e.target.value)
  }
  return (
    <>
      <div id='item' className='relative w-[350px] h-[60px] flex items-center m-2 ptbr-2 bg-gray-700 rounded-md'>
        <div id='image' className=''>
          <img src={item.image} className='rounded-md w-[50px] h-[60px]' alt='' />
        </div>
        <div id='title' className='pl-4 max-w-[200px] max-h-[60px] overflow-hidden'>
          <p className='text-sm opacity-80'>{item.name}</p>
        </div>
        {item.state === 1 && (
          <div id='buttons' className='opacity-80 absolute right-1 top-1/2 transform -translate-y-1/2'>
            <input type='number' min={0} max={4999} value={partValue} onChange={e => handleInputChange(e)} className='text-center bg-gray-700 border-[1px] font-bold w-10 rounded-md' />
          </div>
        )}
      </div>
    </>
  )
}

export default Item
