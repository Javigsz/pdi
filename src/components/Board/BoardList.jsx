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
        className={` ${selected === name ? 'bg-[#f25f4c]' : ''} md:w-1/5 p-2 cursor-pointer border-[#f25f4c]`}
        onClick={handleClick}
      >
        <p className='md:text-xl text-sm text-center'>{name}</p>
      </div>
    </>
  )
}

export default BoardList
