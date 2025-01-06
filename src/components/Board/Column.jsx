import Item from './Item'
import AddItemModal from './AddItemModal'
import Modal from 'react-modal'
import { data } from '../../mocks/data'
import { useState } from 'react'
import { IoAddCircle } from 'react-icons/io5'

Modal.setAppElement(document.getElementById('root'))

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '500px',
    heigth: '900px',
    backgroundColor: '#0f0e17'
  }
}

const Column = ({ name, selected }) => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <div className='w-full h-auto'>
        <div className='flex justify-evenly items-center my-8'>
          <h1 className='pl-20 text-2xl text-center font-bold'>{name}</h1>
          <button onClick={() => setOpenModal(true)} className='p-2 text-xl text-[#f25f4c] border-2 border-transparent hover:border-[#f25f4c] rounded-md '><IoAddCircle /></button>
        </div>
        <div className='flex flex-col items-center'>
          {/* Se puede eliminar el prop propagation cuando tenga el estado */}
          {data[selected].map((item, index) => (
            (name === 'Pendientes' && item.state === 0 && <Item key={index} item={item} />) ||
            (name === 'Viendo' && item.state === 1 && <Item key={index} item={item} />) ||
            (name === 'Vistas' && item.state === 2 && <Item key={index} item={item} />)
          ))}
        </div>
        {openModal &&
          <Modal
            key={openModal.toString()}
            isOpen={openModal}
            style={customStyles}
            onRequestClose={() => setOpenModal(false)}
          >
            <AddItemModal setOpenModal={setOpenModal} selected={selected} name={name} />
          </Modal>}
      </div>
    </>
  )
}

export default Column
