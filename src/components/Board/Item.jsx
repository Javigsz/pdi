import { useState } from 'react'
import { TiDelete } from 'react-icons/ti'
import { getItemUrl } from '../../utils/funcs'

const Item = ({ item, data, setData, selected }) => {
  const [partValue, setPartValue] = useState(item.part)

  const handleInputChange = (e) => {
    setPartValue(e.target.value)
    console.log(e.target.value)
  }

  const handleDeleteItem = () => {
    const newData = structuredClone(data)
    newData[selected] = newData[selected].filter(i => i.id !== item.id)
    setData(newData)
  }
  return (
    <>
      <div
        id='item' className='relative group w-[300px] h-[60px] flex items-center m-2 ptbr-2 bg-gray-700 rounded-md
        hover:h-[200px] hover:border-2 hover:min-w-full hover:m-auto hover:flex-col hover:items-start
        transition-all duration-300 ease-in-out'
      >
        <div className='flex items-center'>
          <div id='image' className=''>
            <img src={item.image} className='rounded-md w-[50px] h-[60px] group-hover:w-[70px] group-hover:h-[100px]' alt='' />
          </div>
          <div id='title' className='pl-4 max-w-[200px] max-h-[60px] overflow-hidden'>
            <p className='text-sm opacity-80 group-hover:opacity-100'>{item.name}</p>
          </div>
        </div>
        <div className='hidden group-hover:inline p-4'>
          <p className='box-orient-vertical line-clamp-4 overflow-hidden text-overflow-ellipsis whitespace-normal text-xs opacity-80'>{item.desc}</p>
        </div>
        {item.state === 1 && (
          <div id='buttons' className='opacity-80 absolute right-1 top-1/2 transform -translate-y-1/2 group-hover:top-[20%]'>
            <input
              type='number'
              min={0}
              max={4999}
              value={partValue}
              onChange={e => handleInputChange(e)}
              className='text-center bg-gray-700 border-[1px] font-bold w-10 rounded-md'
            />
          </div>
        )}
        <a
          href={getItemUrl(item, selected)}
          target='_blank'
          rel='noreferrer'
          className='group-hover:opacity-80 opacity-0 absolute right-1 top-20 cursor-pointer border-2 text-xs px-2 py-1 rounded-md'
        >
          Mas info
        </a>
        <button
          className='absolute z-20 hidden group-hover:block right-0 top-0'
          onClick={() => { handleDeleteItem() }}
        >
          <TiDelete color='#f25f4c' size={20} />
        </button>
      </div>
    </>
  )
}

export default Item
