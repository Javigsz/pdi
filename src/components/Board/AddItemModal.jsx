import { useState, useEffect, useRef, useContext } from 'react'
import { searchFilmsApi, searchSeriesApi, searchBooksApi, searchGamesApi, searchAnimeApi } from '../../hooks/searchApi'
import { filmDefaultImage } from '../../mocks/images'
import { fromNameToIndex, formatDate } from '../../utils/funcs'
import { namesArray } from '../../utils/selectedArray'
import { FiltersContext } from '../../context/filters'

const AddItemModal = ({ name, setOpenModal, data, setData }) => {
  const [searchTitle, setSearchTitle] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [selectValue, setSelectValue] = useState(name)
  const [page, setPage] = useState(1)
  const prevSearchTitle = useRef('')
  const [loader, setLoader] = useState(false)
  const [selectedItem, setSelectedItem] = useState({ id: null, title: null, image: null })
  const { selected } = useContext(FiltersContext)

  const handleSearchChange = (e) => {
    setSearchTitle(e.target.value)
  }

  const handleSelectItem = (item) => {
    if (selectedItem.id === item.id) setSelectedItem({ id: null, title: null, image: null })
    else setSelectedItem(item)
  }

  const handleAddItem = () => {
    if (selectedItem.id !== null) {
      const today = new Date()
      const formattedDate = formatDate(today)

      const itemToAdd = {
        id: crypto.randomUUID(),
        apiId: selectedItem.id,
        name: selectedItem.title,
        desc: selectedItem.desc,
        image: selectedItem.image,
        season: 1,
        part: 1,
        added: formattedDate,
        state: fromNameToIndex(selectValue, selected)
      }
      console.log(selectValue)
      setData({ ...data, [selected]: [...data[selected], itemToAdd] })
      setOpenModal(false)
    }
  }

  const handleClickPage = (value) => {
    if (page + value >= 1) {
      setPage(page + value)
      setLoader(true)
      setSelectedItem({ id: null, title: null, image: null })
    }
  }

  const searchApi = async (title) => {
    if (selected === 'Películas') {
      return searchFilmsApi(title, page)
    } else if (selected === 'Series') {
      return searchSeriesApi(title, page)
    } else if (selected === 'Libros') {
      return searchBooksApi(title, page)
    } else if (selected === 'Videojuegos') {
      return searchGamesApi(title, page)
    } else if (selected === 'Animación') {
      return searchAnimeApi(title, page)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await searchApi(searchTitle, page)
        prevSearchTitle.current = searchTitle
        setLoader(false)
        if (results.length > 0) setSearchResult(results)
        else setSearchResult(null)
      } catch (error) {
        console.error('Error fetching results:', error)
        setLoader(false)
        setSearchResult([])
      }
    }

    const timeoutId = setTimeout(() => {
      if (searchTitle !== '') {
        setLoader(true)
        fetchData()
      }
    }, 2000) // 2 segundos de debounce

    return () => {
      clearTimeout(timeoutId)
      if (searchTitle !== prevSearchTitle.current) {
        prevSearchTitle.current = searchTitle
        setPage(1)
      }
    }// Limpia el timeout al desmontar o cambiar `searchTitle`
  }, [searchTitle, page])

  return (
    <>
      <div className='h-full w-full text-white z-10 font-roboto-slab'>
        <h1>Añadir {selected}</h1>
        <div className='flex justify-between relative'>
          <input
            type='text'
            placeholder='Introduce el Titulo'
            className='rounded-md mt-2 text-black'
            value={searchTitle}
            onChange={(e) => handleSearchChange(e)}
          />
          {/* IMPORTANTE - Hay que arreglar el select para que tenga por defecto la columna correcta */}
          <div className='absolute top-0 left-[200px]'>
            {loader &&
              <svg width='40' height='40' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><circle fill='#F25F4C' stroke='#F25F4C' strokeWidth='15' r='15' cx='40' cy='100'><animate attributeName='opacity' calcMode='spline' dur='2' values='1;0;1;' keySplines='.5 0 .5 1;.5 0 .5 1' repeatCount='indefinite' begin='-.4' /></circle><circle fill='#F25F4C' stroke='#F25F4C' strokeWidth='15' r='15' cx='100' cy='100'><animate attributeName='opacity' calcMode='spline' dur='2' values='1;0;1;' keySplines='.5 0 .5 1;.5 0 .5 1' repeatCount='indefinite' begin='-.2' /></circle><circle fill='#F25F4C' stroke='#F25F4C' strokeWidth='15' r='15' cx='160' cy='100'><animate attributeName='opacity' calcMode='spline' dur='2' values='1;0;1;' keySplines='.5 0 .5 1;.5 0 .5 1' repeatCount='indefinite' begin='0' /></circle>
              </svg>}
          </div>
          <select
            name='state' id='state'
            value={selectValue}
            onChange={(e) => setSelectValue(e.target.value)}
            className='rounded-md mt-2 text-black'
          >
            <option value={namesArray[selected][0]}>{namesArray[selected][0]}</option>
            <option value={namesArray[selected][1]}>{namesArray[selected][1]}</option>
            <option value={namesArray[selected][2]}>{namesArray[selected][2]}</option>
          </select>
        </div>
        <div className={`w-full bg-black my-4 max-h-[300px] ${loader && 'opacity-50'} overflow-y-auto border-x-2`}>
          {searchResult && searchResult.map((result) => (
            <div
              key={result.id}
              onClick={() => handleSelectItem(result)}
              className={`inline-flex items-center w-full h-20 
            ${selectedItem.id === result.id ? 'bg-[#f25f4c]' : 'bg-[#0f0e17]'} hover:bg-[#f25f4c] p-2 rounded-sm cursor-pointer`}
            >
              <img src={`${result.image ? result.image : filmDefaultImage}`} className='w-14 h-full mr-1' alt={result.title} />
              <h2 className='opacity-80 h-20 overflow-hidden flex items-center'>{result.title}</h2>
            </div>
          ))}
          {searchResult && searchResult.length > 0 && (
            <div className='absolute bottom-[65px] right-[200px]'>
              {page > 1 &&
                <button
                  disabled={loader}
                  onClick={() => handleClickPage(-1)}
                  className={`mr-2 ${loader ? 'bg-[#0f0e17]' : 'bg-[#f25f4c]'} p-1 rounded-sm`}
                >
                  &#60;
                </button>}
              <span>Pág. {page}</span>
              {searchResult.length >= 20 &&
                <button
                  disabled={loader}
                  onClick={() => handleClickPage(1)}
                  className={`ml-2 ${loader ? 'bg-[#0f0e17]' : 'bg-[#f25f4c]'} p-1 rounded-sm`}
                >
                  &#62;
                </button>}
            </div>
          )}
          {!searchResult && (
            <div className='flex justify-center items-center h-20'>
              <p>No se encontraron resultados</p>
            </div>
          )}
        </div>
        <div className='flex justify-between h-10 mt-10'>
          <button
            className={`${selectedItem.id ? 'bg-[#f25f4c] cursor-pointer' : 'bg-[#0f0e17] cursor-default'} rounded-md px-2 py-1 mr-2 flex items-center font-bold`}
            onClick={() => handleAddItem()}
          >
            Añadir: {selectedItem.id ? selectedItem.title : ''}
          </button>
          {/* <p className='opacity-80 text-white w-3/4 text-center'>{selectedItem && selectedItem.title}</p> */}
          <button onClick={() => setOpenModal(false)} className='rounded-md border-2 px-2 py-1 hover:bg-[#f25f4c] mr-2'>
            Cerrar
          </button>
        </div>
      </div>
    </>
  )
}

export default AddItemModal
