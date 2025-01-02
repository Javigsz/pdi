const BoardList = ({ name, selected, setSelected }) => {
  const handleClick = () => {
    setSelected(name)
    console.log(name)
  }
  return (
    <>
      <div className={` ${selected === name ? 'bg-blue-300' : 'bg-white'} w-full rounded-tr cursor-pointer`} onClick={() => handleClick()}>
        <p className='text-4xl text-center'>{name}</p>
      </div>
    </>
  )
}

export default BoardList
