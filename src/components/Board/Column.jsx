// import Item from './Item'
import ItemCopy from './ItemCopy'
import AddItemModal from './AddItemModal'
import Modal from 'react-modal'
import { useState } from 'react'
import { IoAddCircle } from 'react-icons/io5'
import { namesArray } from '../../utils/selectedArray'

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

const Column = ({ icon, name, selected, data, setData }) => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <div className='w-full h-auto mx-6'>
        <div className='flex justify-evenly items-center my-8'>
          <div>{icon}</div>
          <h1 className='text-2xl text-center font-bold'>{name}</h1>
          <button onClick={() => setOpenModal(true)} className='p-2 text-xl text-[#f25f4c] border-2 border-transparent hover:border-[#f25f4c] rounded-md '><IoAddCircle /></button>
        </div>
        <div className='grid grid-cols-[repeat(auto-fit,_minmax(130px,_1fr))] gap-2 place-items-center'>
          {/* Se puede eliminar el prop propagation cuando tenga el estado */}
          {data[selected].map((item, index) => (
            (name === namesArray[selected][0] && item.state === 0 && <ItemCopy key={index} item={item} data={data} setData={setData} selected={selected} />) ||
            (name === namesArray[selected][1] && item.state === 1 && <ItemCopy key={index} item={item} data={data} setData={setData} selected={selected} />) ||
            (name === namesArray[selected][2] && item.state === 2 && <ItemCopy key={index} item={item} data={data} setData={setData} selected={selected} />)
          ))}
        </div>
        {openModal &&
          <Modal
            key={openModal.toString()}
            isOpen={openModal}
            style={customStyles}
            onRequestClose={() => setOpenModal(false)}
          >
            <AddItemModal setOpenModal={setOpenModal} selected={selected} name={name} data={data} setData={setData} />
          </Modal>}
      </div>
    </>
  )
}

export default Column
