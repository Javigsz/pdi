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
        className={` ${selected === name ? 'bg-[#f25f4c]' : 'bg-[#16142f]'} w-full rounded-t p-2 cursor-pointer`}
        onClick={handleClick}
      >
        <p className='sm:text-xl text-lg text-center'>{name}</p>
      </div>
    </>
  )
}

export default BoardList
