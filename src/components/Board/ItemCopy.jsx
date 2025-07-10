import { TiDelete } from 'react-icons/ti'
import { getItemUrl } from '../../utils/funcs'
import { selectedArray } from '../../utils/selectedArray'
import { TbEyeCheck } from 'react-icons/tb'
import { FaEye, FaRegEyeSlash } from 'react-icons/fa'
import { useContext, useEffect, useState } from 'react'
import { FiltersContext } from '../../context/filters'
import ImageLoader from './ImageLoader'
import useUpdateApi from '../../hooks/useUpdateApi'
import { AuthContext } from '../../context/authContext'
import { useLocation } from 'wouter'

const ItemCopy = ({ item, data, setData }) => {
  const { selected } = useContext(FiltersContext)
  const [isReady, setIsReady] = useState(false)
  const [showButtons, setShowButtons] = useState(false)
  const { updateItem, deleteItem } = useUpdateApi()
  const { isLoggedIn, loggedUsername } = useContext(AuthContext)
  const { pathname } = useLocation()
  const modificableItem = isLoggedIn && pathname && pathname.includes(loggedUsername)

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
    newData[selected] = newData[selected].filter((i) => i.apiId !== item.apiId)
    setData(newData)
    deleteItem(item.apiId, selected, data, setData)
  }

  const handleMouseEnter = () => {
    setTimeout(() => {
      setShowButtons(true)
    }, 200)
  }

  const handleMouseLeave = () => {
    setShowButtons(false)
  }

  return (
    <>
      <div
        id='item'
        className={`${isReady ? 'visible opacity-100' : 'invisible opacity-0 transition-opacity duration-300'} relative group flex items-center m-2 bg-black rounded-md
        hover:flex-col hover:items-start hover:z-10 hover:border-[#f25f4c] border-transparent hover:border-2 md:hover:w-[280px] 
        
        ${selected === 'Videojuegos' ? 'w-[120px] h-[100px] md:h-32 md:w-52 md:hover:h-48' : 'h-[100px] w-20 md:h-[190px] md:w-32 hover:w-[120px]'}
        transition-[width,height] duration-200 ease-in-out`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className='flex items-center h-full w-full flex-row justify-center'>
          <div
            id='image'
            className={`h-full w-full group-hover:hidden md:group-hover:block group-hover:w-full
          ${selected === 'Videojuegos' ? 'absolute group-hover:opacity-25' : 'md:group-hover:w-[80%]'}`}
          >
            <ImageLoader src={item.image} alt={item.name} />
          </div>
          <div
            id='title'
            className='overflow-hidden hidden md:group-hover:flex md:group-hover:max-w-[60%] group-hover:hidden group-hover:w-full z-10'
          >
            <p className='md:block hidden text-xs w-full break-words opacity-80 text-center group-hover:opacity-100 group-hover:font-bold group-hover:text-[#f25f4c] group-hover:text-xs sm:group-hover:text-base'>
              {item.name}
            </p>
          </div>
          {item.state !== 78 && (
            <div
              id='buttons'
              className='flex md:absolute top-2 flex-col left-[132px]'
            >
              <div className='group-hover:block hidden text-xs'>
                {selectedArray[selected][0]}:
                <input
                  type='number'
                  disabled={!modificableItem}
                  min={0}
                  max={4999}
                  value={item.season}
                  onChange={(e) => handleInputChangeSeason(e)}
                  className='text-xs text-center bg-transparent border-[1px] font-bold w-10 rounded-md'
                />
              </div>
              <div className='group-hover:block hidden text-xs'>
                {selectedArray[selected][1]}:
                <input
                  type='number'
                  disabled={!modificableItem}
                  min={0}
                  max={4999}
                  value={item.part}
                  onChange={(e) => handleInputChangePart(e)}
                  className='text-xs text-center bg-transparent border-[1px] font-bold w-10 rounded-md'
                />
              </div>
            </div>
          )}
        </div>
        <div
          className={`group-hover:flex hidden group-hover:justify-center group-hover:items-center md:absolute md:bottom-3 md:right-2 w-full md:w-auto ${showButtons ? '' : 'pointer-events-none'}`}
        >
          <button
            disabled={item.state === 0 || !showButtons || !modificableItem}
            onClick={() => handleClickChange(0)}
            className={`${item.state === 0 ? '' : 'hover:bg-[#f25f4c] rounded-sm'}`}
          >
            <FaRegEyeSlash
              color={item.state === 0 ? '#f25f4c' : 'white'}
              className='text-sm md:text-xl'
            />
          </button>
          <button
            disabled={item.state === 1 || !showButtons || !modificableItem}
            onClick={() => handleClickChange(1)}
            className={`mx-2 ${item.state === 1 ? '' : 'hover:bg-[#f25f4c] rounded-sm'}`}
          >
            <FaEye
              color={item.state === 1 ? '#f25f4c' : 'white'}
              className='text-sm md:text-xl'
            />
          </button>
          <button
            disabled={item.state === 2 || !showButtons || !modificableItem}
            onClick={() => handleClickChange(2)}
            className={`${item.state === 2 ? '' : 'hover:bg-[#f25f4c] rounded-sm'}`}
          >
            <TbEyeCheck
              color={item.state === 2 ? '#f25f4c' : 'white'}
              className='text-sm md:text-xl'
            />
          </button>
        </div>
        <a
          href={getItemUrl(item, selected)}
          target='_blank'
          rel='noreferrer'
          className={`md:absolute md:bottom-3 md:left-[125px] md:group-hover:block group-hover:flex hidden hover:text-[#f25f4c]
          hover:border-[#f25f4c] font-bold cursor-pointer px-2 py-1 rounded-md text-xs ${showButtons ? '' : 'pointer-events-none'}`}
        >
          Mas info
        </a>
        {modificableItem && (
          <button
            disabled={!showButtons}
            className={`absolute z-20 hidden group-hover:block right-0 top-0 ${showButtons ? '' : 'pointer-events-none'}`}
            onClick={handleDeleteItem}
          >
            <TiDelete color='red' size={20} />
          </button>
        )}
      </div>
    </>
  )
}

export default ItemCopy
