const BoardList = ({ name, selected, setSelected }) => {
  const handleClick = () => {
    setSelected(name)
    console.log(name)
  }
  return (
    <>
      <div className={` ${selected === name ? 'bg-[#f25f4c]' : 'bg-[#161422]'} rounded-t mt-4 p-2 cursor-pointer`} onClick={() => handleClick()}>
        <p className='text-xl text-center'>{name}</p>
      </div>
    </>
  )
}

export default BoardList
