import { createContext, useState } from 'react'

// Este es el que tenemos que consumir
export const FiltersContext = createContext()

// Este es el que nos provee de acceso al contexto
export function FiltersProvider ({ children }) {
  const [searchText, setSearchText] = useState('')
  const [selected, setSelected] = useState('Películas')
  const [order, setOrder] = useState({
    type: 'added',
    direction: 'desc'
  })

  return (
    <FiltersContext.Provider value={{
      searchText,
      setSearchText,
      order,
      setOrder,
      selected,
      setSelected
    }}
    >
      {children}
    </FiltersContext.Provider>
  )
}
