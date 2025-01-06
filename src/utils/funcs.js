export const fromNameToIndex = (name) => (name === 'Pendientes' ? 0 : name === 'Viendo' ? 1 : name === 'Vistas' ? 2 : null)

export const getItemUrl = (item, type) => {
  if (type === 'Peliculas') return `https://www.themoviedb.org/movie/${item.apiId}`
  if (type === 'Series') return `https://www.themoviedb.org/tv/${item.apiId}`
  if (type === 'Libros') return `https://openlibrary.org/${item.apiId}`
  if (type === 'Videojuegos') return `https://rawg.io/games/${item.apiId}`
  if (type === 'Anime') return `https://myanimelist.net/anime/${item.apiId}`
  return null
}
