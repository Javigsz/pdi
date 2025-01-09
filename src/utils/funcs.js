export const fromNameToIndex = (name) => (name === 'Pendientes' ? 0 : name === 'Viendo' ? 1 : name === 'Vistas' ? 2 : null)

export const getItemUrl = (item, type) => {
  if (type === 'Peliculas') return `https://www.themoviedb.org/movie/${item.apiId}`
  if (type === 'Series') return `https://www.themoviedb.org/tv/${item.apiId}`
  if (type === 'Libros') return `https://openlibrary.org/${item.apiId}`
  if (type === 'Videojuegos') return `https://rawg.io/games/${item.apiId}`
  if (type === 'Anime') return `https://myanimelist.net/anime/${item.apiId}`
  return null
}

export const orderResults = (results, type, direction) => {
  results.sort((a, b) => {
    if (type === 'name') {
      if (direction === 'desc') return a.name.localeCompare(b.name)
      if (direction === 'asc') return b.name.localeCompare(a.name)
    }

    if (type === 'added') {
      const dateA = new Date(a.added)
      const dateB = new Date(b.added)
      if (direction === 'asc') return dateB - dateA
      if (direction === 'desc') return dateA - dateB
    }

    return 0
  })

  return results
}

export const formatDate = (date) => {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${year}-${month}-${day}`
}
