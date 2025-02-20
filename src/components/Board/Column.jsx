// import Item from './Item'
import ItemCopy from './ItemCopy'
import AddItemModal from './AddItemModal'
import Modal from 'react-modal'
import { useState, useContext } from 'react'
import { IoAddCircle } from 'react-icons/io5'
import { FaLongArrowAltUp } from 'react-icons/fa'
import { namesArray } from '../../utils/selectedArray'
import { FiltersContext } from '../../context/filters'
import { orderResults } from '../../utils/funcs'
import { customStyles } from '../../utils/modalStyle'
import { DataContext } from '../../context/dataContext'

Modal.setAppElement(document.getElementById('root'))

const Column = ({ icon, name }) => {
  const [openModal, setOpenModal] = useState(false)
  const { searchText, order, selected } = useContext(FiltersContext)
  const { tablesData, setTablesData, loading } = useContext(DataContext)

  return (
    <>
      <div className='w-full px-2'>
        <div className='relative flex justify-evenly items-center my-8'>
          <div>{icon}</div>
          <h1 className='sm:text-2xl text-xl text-center font-bold'>{name}</h1>
          <div className='relative'>
            {tablesData[selected].length === 0 && searchText === '' && !loading &&
              <div className='absolute top-10 right-[5px]'>
                <FaLongArrowAltUp size={30} color='#f25f4c' />
              </div>}
            <button
              onClick={() => setOpenModal(true)}
              className='p-2 text-xl text-[#f25f4c] border-2 border-transparent hover:border-[#f25f4c] rounded-md '
            >
              <IoAddCircle />
            </button>
          </div>
        </div>
        <div className='grid grid-cols-[repeat(auto-fit,_minmax(16vh,_1fr))] gap-2 place-items-center w-full'>
          {/* Se puede eliminar el prop propagation cuando tenga el estado */}
          {orderResults(tablesData[selected].filter(item => item.name.toLowerCase().includes(searchText.toLowerCase())), order.type, order.direction).map((item) => (
            (name === namesArray[selected][0] && item.state === 0 &&
              <ItemCopy key={`${selected}-${item.name}`} item={item} data={tablesData} setData={setTablesData} />) ||
            (name === namesArray[selected][1] && item.state === 1 &&
              <ItemCopy key={`${selected}-${item.name}`} item={item} data={tablesData} setData={setTablesData} />) ||
            (name === namesArray[selected][2] && item.state === 2 &&
              <ItemCopy key={`${selected}-${item.name}`} item={item} data={tablesData} setData={setTablesData} />)
          ))}
        </div>
        {tablesData[selected].length === 0 && searchText === '' && !loading &&
          <div className='relative'>
            <p className='text-center text-[#f25f4c]'>Empieza añadiendo {selected}!</p>
          </div>}
        {tablesData[selected].filter(item => item.name.toLowerCase().includes(searchText.toLowerCase())).length === 0 && searchText !== '' &&
          <div className='relative'>
            <p className='text-center text-[#f25f4c]'>No se encontraron resultados</p>
          </div>}
        {openModal &&
          <Modal
            key={openModal.toString()}
            isOpen={openModal}
            style={customStyles}
            onRequestClose={() => setOpenModal(false)}
          >
            <AddItemModal setOpenModal={setOpenModal} selected={selected} name={name} data={tablesData} setData={setTablesData} />
          </Modal>}
      </div>
    </>
  )
}

export default Column
