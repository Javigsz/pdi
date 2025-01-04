const filmApiKey = import.meta.env.VITE_FILM_API_KEY

export const searchFilmsApi = async (query, page) => {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${filmApiKey}&language=es-ES&page=${page}&include_adult=false&query=${query}` // `https://api.themoviedb.org/3/search/movie?api_key=YOUR_API_KEY&query=SEARCH_TERM`
  const response = await fetch(url)
  const data = await response.json()

  const result = data.results.map((movie) => ({
    id: movie.id,
    title: movie.title,
    image: movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : null
  }))

  return result
}

export const searchSeriesApi = async (query, page) => {
  const url = `https://api.themoviedb.org/3/search/tv?api_key=${filmApiKey}&language=es-ES&page=${page}&include_adult=false&query=${query}`
  const response = await fetch(url)
  const data = await response.json()

  console.log(data)

  const result = data.results.map((serie) => ({
    id: serie.id,
    title: serie.name,
    image: serie.poster_path ? `https://image.tmdb.org/t/p/w500/${serie.poster_path}` : null
  }))

  return result
}
