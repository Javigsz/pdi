const filmApiKey = import.meta.env.VITE_FILM_API_KEY
const gamesApiKey = import.meta.env.VITE_GAMES_API_KEY

export const searchFilmsApi = async (query, page) => {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${filmApiKey}&language=es-ES&page=${page}&include_adult=false&query=${query}` // `https://api.themoviedb.org/3/search/movie?api_key=YOUR_API_KEY&query=SEARCH_TERM`
  const response = await fetch(url)
  const data = await response.json()

  const result = data.results.map((movie) => ({
    id: movie.id,
    title: movie.title,
    desc: movie.overview || null,
    image: movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : null
  }))

  return result
}

export const searchAnimeApi = async (query, page) => {
  const url = `https://api.jikan.moe/v4/anime?q=${query}&page=${page}&limit=20`
  const response = await fetch(url)
  const data = await response.json()

  const result = data.data.map((anime) => ({
    id: anime.mal_id,
    desc: anime.synopsis || null,
    title: anime.title,
    image: anime.images.jpg.image_url || null
  }))

  return result
}

export const searchSeriesApi = async (query, page) => {
  const url = `https://api.themoviedb.org/3/search/tv?api_key=${filmApiKey}&language=es-ES&page=${page}&include_adult=false&query=${query}`
  const response = await fetch(url)
  const data = await response.json()

  const result = data.results.map((serie) => ({
    id: serie.id,
    title: serie.name,
    desc: serie.overview || null,
    image: serie.poster_path ? `https://image.tmdb.org/t/p/w500/${serie.poster_path}` : null
  }))

  return result
}

export const searchBooksApi = async (query, page) => {
//   const url = `https://openlibrary.org/search.json?q=${query}&page=${page}` // `https://openlibrary.org/search.json?q=the+lord+of+the+rings&page=2`
  const url = `https://openlibrary.org/search.json?q=${query}&limit=20&fields=title+cover_i+key+author_name+olid+isbn&page=${page}&lang=es`
  const response = await fetch(url)
  const data = await response.json()

  console.log(data)

  const result = data.docs.map((book) => ({
    id: book.key,
    title: book.title,
    desc: book.author_name[0] ? 'Autor: ' + book.author_name.join(', ') : null,
    image: book.cover_i
      ? 'https://covers.openlibrary.org/b/ID/' + book.cover_i + '-M.jpg'
      : (book.isbn && book.isbn[0])
          ? 'https://covers.openlibrary.org/b/ISBN/' + book.isbn[0] + '-M.jpg'
          : null
  }))

  return result
}

export const searchGamesApi = async (query, page) => {
  const url = `https://api.rawg.io/api/games?search=${query}&search_exact=true&page=${page}&page_size=20&key=${gamesApiKey}`
  const response = await fetch(url)
  const data = await response.json()

  //   const descs = data.results.map((game) => ({
  //     id: game.id,
  //     genres: 'Generos: ' + game.genres.map((genre) => genre.name).join(', '),
  //     released: 'Fecha de lanzamiento: ' + game.released,
  //     tags: 'Etiquetas: ' + game.tags.map((tag) => tag.name).join(', '),
  //     platforms: 'Plataformas: ' + game.platforms.map((platform) => platform.platform.name).join(', ')
  //   }))

  //   const result = data.results.map((game) => {
  //     const desc = descs.find((desc) => desc.id === game.id)
  //     const descString = Object.values(desc)
  //       .filter((value, index, array) => array[index] !== desc.id)
  //       .join(' - ')

  //     return {
  //       id: game.id,
  //       title: game.name,
  //       desc: descString,
  //       image: game.background_image || null
  //     }
  //   })

  const result = data.results.map((game) => ({
    id: game.id,
    title: game.name,
    desc: 'Generos: ' + game.genres.map((genre) => genre.name).join(', ') || null,
    image: game.background_image || null
  }))

  return result
}
