import { TiDelete } from 'react-icons/ti'
import { getItemUrl } from '../../utils/funcs'
import { selectedArray } from '../../utils/selectedArray'
import { TbEyeCheck } from 'react-icons/tb'
import { FaEye, FaRegEyeSlash } from 'react-icons/fa'
import { useContext, useEffect, useState } from 'react'
import { FiltersContext } from '../../context/filters'
import ImageLoader from './ImageLoader'
import useUpdateApi from '../../hooks/useUpdateApi'

const ItemCopy = ({ item, data, setData }) => {
//   const [partValue, setPartValue] = useState(item.part)
  const { selected } = useContext(FiltersContext)
  const [isReady, setIsReady] = useState(false)
  const { updateItem, deleteItem } = useUpdateApi()

  useEffect(() => {
    setTimeout(() => {
      setIsReady(true)
    }, 300)
  }, [])

  const handleInputChangeSeason = (e) => {
    const newItem = structuredClone(item)
    newItem.season = e.target.value
    updateItem(item.apiId, newItem, selected, data, setData)
  }

  const handleInputChangePart = (e) => {
    const newItem = structuredClone(item)
    newItem.part = e.target.value
    updateItem(item.apiId, newItem, selected, data, setData)
  }

  const handleClickChange = (newState) => {
    const newItem = structuredClone(item)
    newItem.state = newState
    updateItem(item.apiId, newItem, selected, data, setData)
  }

  const handleDeleteItem = () => {
    const newData = structuredClone(data)
    newData[selected] = newData[selected].filter(i => i.apiId !== item.apiId)
    setData(newData)
    deleteItem(item.apiId, selected, data, setData)
  }

  return (
    <>
      <div
        id='item' className={`${isReady ? 'visible opacity-100' : 'invisible opacity-0 transition-opacity duration-300'} relative group h-[190px] w-32 flex items-center m-2 bg-black rounded-md
        hover:border-2 hover:w-[280px] sm:hover:w-[320px] hover:h-[190px] hover:flex-col hover:items-start hover:z-10 hover:border-[#f25f4c]
        transition-all duration-200 ease-in-out`}
      >
        <div className='flex items-center h-full w-full flex-col jsutify-center group-hover:flex-row'>
          <div id='image' className='h-full w-full group-hover:w-[40%]'>
            {/* <img src={item.image} className='rounded-md w-full h-full group-hover:rounded-md' alt='' /> */}
            <ImageLoader src={item.image} alt={item.name} />
          </div>
          <div id='title' className='overflow-hidden hidden px-4 group-hover:flex group-hover:max-w-[60%] '>
            <p className='text-xs w-full break-words opacity-80 text-center group-hover:opacity-100 group-hover:font-bold group-hover:text-[#f25f4c] group-hover:text-xs sm:group-hover:text-base'>{item.name}</p>
          </div>
          {item.state !== 0 && (
            <div id='buttons' className='flex opacity-0 group-hover:opacity-80 absolute top-2 flex-col left-[132px] '>
              <div
                className='text-xs group-hover:block hidden'
              >
                {selectedArray[selected][0]}:
                <input
                  type='number'
                  min={0}
                  max={4999}
                  value={item.season}
                  onChange={e => handleInputChangeSeason(e)}
                  className='text-xs text-center bg-transparent border-[1px] font-bold w-10 rounded-md'
                />
              </div>
              <div
                className='text-xs group-hover:block hidden'
              >
                {selectedArray[selected][1]}:
                <input
                  type='number'
                  min={0}
                  max={4999}
                  value={item.part}
                  onChange={e => handleInputChangePart(e)}
                  className='text-xs text-center bg-transparent border-[1px] font-bold w-14 rounded-md'
                />
              </div>
            </div>
          )}
        </div>
        {/* <div className='hidden group-hover:inline p-4'>
          <p className='box-orient-vertical line-clamp-4 overflow-hidden text-overflow-ellipsis whitespace-normal text-xs opacity-80'>{item.desc}</p>
        </div> */}
        <div className='group-hover:block hidden justify-between items-center absolute bottom-2 right-2'>
          <button
            disabled={item.state === 0}
            onClick={() => handleClickChange(0)}
            className={`${item.state === 0 ? '' : 'hover:bg-[#f25f4c] rounded-sm'}`}
          >
            <FaRegEyeSlash
              color={item.state === 0 ? '#f25f4c' : 'white'}
              className='text-sm sm:text-xl'
            />
          </button>
          <button
            disabled={item.state === 1}
            onClick={() => handleClickChange(1)}
            className={`mx-2 ${item.state === 1 ? '' : 'hover:bg-[#f25f4c] rounded-sm'}`}
          >
            <FaEye
              color={item.state === 1 ? '#f25f4c' : 'white'}
              className='text-sm sm:text-xl'
            />
          </button>
          <button
            disabled={item.state === 2}
            onClick={() => handleClickChange(2)}
            className={`${item.state === 2 ? '' : 'hover:bg-[#f25f4c] rounded-sm'}`}
          >
            <TbEyeCheck
              color={item.state === 2 ? '#f25f4c' : 'white'}
              className='text-sm sm:text-xl'
            />
          </button>
        </div>
        <a
          href={getItemUrl(item, selected)}
          target='_blank'
          rel='noreferrer'
          className='absolute bottom-3 left-[125px] group-hover:block hidden hover:text-[#f25f4c]
          hover:border-[#f25f4c] font-bold cursor-pointer text-xs px-2 py-1 rounded-md group-hover:text-xs
          sm:group-hover:text-sm'
        >
          Mas info
        </a>
        <button
          className='absolute z-20 hidden group-hover:block right-0 top-0'
          onClick={handleDeleteItem}
        >
          <TiDelete color='red' size={25} />
        </button>
      </div>
    </>
  )
}

export default ItemCopy
