import { useContext } from 'react'
import { FiltersContext } from '../../context/filters'

const BoardList = ({ name }) => {
  const { selected, setSelected } = useContext(FiltersContext)
  const handleClick = () => {
    setSelected(name)
  }
  return (
    <>
      <div className={` ${selected === name ? 'bg-[#f25f4c]' : 'bg-[#161422]'} rounded-t p-2 cursor-pointer`} onClick={() => handleClick()}>
        <p className='text-xl text-center'>{name}</p>
      </div>
    </>
  )
}

export default BoardList
