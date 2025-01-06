import { useState, useEffect } from 'react'
import { searchFilmsApi, searchSeriesApi, searchBooksApi, searchGamesApi, searchAnimeApi } from '../../hooks/searchApi'
import { filmDefaultImage } from '../../mocks/images'

const AddItemModal = ({ setOpenModal, selected }) => {
  const [searchTitle, setSearchTitle] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [selectedItem, setSelectedItem] = useState({ id: null, title: null, image: null })

  const handleSearchChange = (e) => {
    setSearchTitle(e.target.value)
  }

  const handleSelectItem = (item) => {
    if (selectedItem.id === item.id) setSelectedItem({ id: null, title: null, image: null })
    else setSelectedItem(item)
  }

  const searchApi = async (title) => {
    if (selected === 'Peliculas') {
      return searchFilmsApi(title, 1)
    } else if (selected === 'Series') {
      return searchSeriesApi(title, 1)
    } else if (selected === 'Libros') {
      return searchBooksApi(title, 1)
    } else if (selected === 'Videojuegos') {
      return searchGamesApi(title, 1)
    } else if (selected === 'Anime') {
      return searchAnimeApi(title, 1)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await searchApi(searchTitle, 1)
        if (results.length > 0) setSearchResult(results)
        else setSearchResult(null)
      } catch (error) {
        console.error('Error fetching results:', error)
      }
    }

    const timeoutId = setTimeout(() => {
      if (searchTitle !== '') {
        fetchData()
      }
    }, 2000) // 2 segundos de debounce

    return () => clearTimeout(timeoutId) // Limpia el timeout al desmontar o cambiar `searchTitle`
  }, [searchTitle])

  return (
    <>
      <div className='h-full w-full text-white z-10'>
        <h1>Añadir {selected}</h1>
        <div className='flex justify-between'>
          <input
            type='text'
            placeholder='Introduce el Titulo'
            className='rounded-md mt-2 text-black'
            value={searchTitle}
            onChange={(e) => handleSearchChange(e)}
          />
          {/* IMPORTANTE - Hay que arreglar el select para que tenga por defecto la columna correcta */}
          <select name='state' id='state' defaultValue={2} className='rounded-md mt-2 text-black'>
            <option value='0'>Pendiente</option>
            <option value='1'>Viendo</option>
            <option value='2'>Vistas</option>
          </select>
        </div>
        <div className='w-full bg-black my-4 max-h-[300px] overflow-y-auto border-x-2'>
          {searchResult && searchResult.map((result) => (
            <div key={result.id} onClick={() => handleSelectItem(result)} className={`inline-flex items-center w-full h-20 ${selectedItem.id === result.id ? 'bg-[#f25f4c]' : 'bg-[#0f0e17]'} hover:bg-[#f25f4c] p-2 rounded-sm cursor-pointer`}>
              <img src={`${result.image ? result.image : filmDefaultImage}`} className='w-14 h-full mr-1' alt={result.title} />
              <h2 className='opacity-80 h-20 overflow-hidden flex items-center'>{result.title}</h2>
            </div>
          ))}
          {!searchResult && (
            <div className='flex justify-center items-center h-20'>
              <p>No se encontraron resultados</p>
            </div>
          )}
        </div>
        <div className='flex justify-between h-10'>
          <button className={`${selectedItem.id ? 'bg-[#f25f4c] cursor-pointer' : 'bg-[#0f0e17] cursor-default'} rounded-md px-2 py-1 mr-2 font-bold`}>
            Añadir
          </button>
          <p className='opacity-80 text-white w-3/4 text-center'>{selectedItem && selectedItem.title}</p>
          <button onClick={() => setOpenModal(false)} className='rounded-md border-2 px-2 py-1 hover:bg-[#f25f4c] mr-2'>
            Cerrar
          </button>
        </div>
      </div>
    </>
  )
}

export default AddItemModal
