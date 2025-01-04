import { data } from '../mocks/data.js'

const Header = () => {
  return (
    <>
      <div className='bg-[#0f0e17] h-24 p-4 flex border-b-4 border-[white] justify-center items-center'>
        <h1 className=' font-bold text-2xl'>{data.userName} PDI</h1>
      </div>
    </>
  )
}

export default Header
