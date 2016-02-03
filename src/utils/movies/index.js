export const formatMovie = movie => {
  const genres = movie.genres;
  const mainGenre = genres.length === 0 ? 'none' : genres[0];
  return {
    title: movie.title,
    released: movie.released,
    ids: movie.ids,
    sinopsis: movie.overview,
    runtime: movie.runtime,
    votes: 0,
    totalRating: 0,
    genres,
    mainGenre,
    certification: movie.certification || 'N/A',
    tagline: movie.tagline,
    trailer: movie.trailer,
    slug: movie.ids.slug
  };
};

export const updatedMovie = movie => {
  const genres = movie.genres;
  const mainGenre = genres.length === 0 ? 'none' : genres[0];
  return {
    title: movie.title,
    released: movie.released,
    ids: movie.ids,
    sinopsis: movie.overview,
    runtime: movie.runtime,
    genres,
    mainGenre,
    certification: movie.certification || 'N/A',
    tagline: movie.tagline,
    trailer: movie.trailer,
    slug: movie.ids.slug
  };
};

export const getImages = movie => ({
  images:{
    poster: movie.images.poster.thumb || false,
    fanart: movie.images.fanart.thumb || false
  }
});

export const formatMovieWithImages = movie => {
  const id = movie.ids.trakt;
  const movieDataWithImages = Object.assign({}, formatMovie(movie), getImages(movie));
  return {[id]: movieDataWithImages};
};

export const updateMovieWithImages = movie => {
  const id = movie.ids.trakt;
  const movieDataWithImages = Object.assign({}, updatedMovie(movie), getImages(movie));
  return {[id]: movieDataWithImages};
};
