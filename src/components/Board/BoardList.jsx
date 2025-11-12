import { useContext } from 'react'
import { FiltersContext } from '../../context/filters'

const BoardList = ({ name }) => {
  const { selected, setSelected } = useContext(FiltersContext)
  const handleClick = () => {
    setSelected(name)
  }
  return (
    <>
      <div
        className={` ${selected === name ? '' : 'bg-opacity-0 hover:bg-opacity-60'} bg-[#f25f4c] md:w-1/5 py-2 px-4 cursor-pointer rounded-sm`}
        onClick={handleClick}
      >
        <p className='md:text-xl text-sm text-center'>{name}</p>
      </div>
    </>
  )
}

export default BoardList
