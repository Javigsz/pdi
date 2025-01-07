import { useState } from 'react'
import { TiDelete } from 'react-icons/ti'
import { getItemUrl } from '../../utils/funcs'
import { TbEyeCheck } from 'react-icons/tb'
import { FaEye, FaRegEyeSlash } from 'react-icons/fa'

const ItemCopy = ({ item, data, setData, selected }) => {
  const [partValue, setPartValue] = useState(item.part)

  const handleInputChange = (e) => {
    setPartValue(e.target.value)
  }

  const handleClickChange = (newState) => {
    const newData = structuredClone(data)
    newData[selected].find(i => i.id === item.id).state = newState
    setData(newData)
  }

  const handleDeleteItem = () => {
    const newData = structuredClone(data)
    newData[selected] = newData[selected].filter(i => i.id !== item.id)
    setData(newData)
  }
  return (
    <>
      <div
        id='item' className='relative group w-[110px] h-[160px] flex items-center m-2 bg-black rounded-md
        hover:border-2 hover:w-[300px] hover:flex-col hover:items-start hover:z-10 hover:border-[#f25f4c]
        transition-all duration-100 ease-in-out'
      >
        <div className='flex items-center h-full w-full flex-col jsutify-center group-hover:flex-row'>
          <div id='image' className='h-[120px] w-full group-hover:w-[40%] group-hover:h-full'>
            <img src={item.image} className='rounded-t-md w-full h-full group-hover:rounded-md' alt='' />
          </div>
          <div id='title' className='overflow-hidden px-4 flex '>
            <p className='text-xs w-full break-all opacity-80 text-center group-hover:opacity-100 font-bold group-hover:text-base group-hover:text-[#f25f4c] group'>{item.name}</p>
          </div>
          {item.state === 1 && (
            <div id='buttons' className='flex opacity-0 group-hover:opacity-80 absolute top-2 flex-col left-[132px] '>
              <div className='text-xs group-hover:block hidden'>Temporada: <input type='number' min={0} max={4999} value={partValue} onChange={e => handleInputChange(e)} className='text-center bg-gray-700 border-[1px] font-bold w-10 rounded-md' /></div>
              <div className='text-xs group-hover:block hidden'>Episodio: <input type='number' min={0} max={4999} className='text-center bg-gray-700 border-[1px] font-bold w-14 rounded-md' /></div>
            </div>
          )}
        </div>
        {/* <div className='hidden group-hover:inline p-4'>
          <p className='box-orient-vertical line-clamp-4 overflow-hidden text-overflow-ellipsis whitespace-normal text-xs opacity-80'>{item.desc}</p>
        </div> */}
        <div className='group-hover:block hidden justify-between items-center absolute bottom-2 right-2'>
          <button disabled={item.state === 0} onClick={() => handleClickChange(0)} className={`${item.state === 0 ? '' : 'hover:bg-[#f25f4c] rounded-sm'}`}>
            <FaRegEyeSlash color={item.state === 0 ? '#f25f4c' : 'white'} size={20} />
          </button>
          <button disabled={item.state === 1} onClick={() => handleClickChange(1)} className={`mx-2 ${item.state === 1 ? '' : 'hover:bg-[#f25f4c] rounded-sm'}`}>
            <FaEye color={item.state === 1 ? '#f25f4c' : 'white'} size={20} />
          </button>
          <button disabled={item.state === 2} onClick={() => handleClickChange(2)} className={`${item.state === 2 ? '' : 'hover:bg-[#f25f4c] rounded-sm'}`}>
            <TbEyeCheck size={20} color={item.state === 2 ? '#f25f4c' : 'white'} />
          </button>
        </div>
        <a href={getItemUrl(item, selected)} target='_blank' rel='noreferrer' className='absolute bottom-3 left-[125px] group-hover:block hidden hover:text-[#f25f4c] hover:border-[#f25f4c] font-bold cursor-pointer text-xs px-2 py-1 rounded-md'>Mas info</a>
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

export default ItemCopy