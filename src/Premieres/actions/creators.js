import { SET_MOVIES, SET_WATCHED_MOVIE, SET_WATCHED_MOVIE_RATINGS, SET_WISHED_MOVIES, CLEAR_WISHED_MOVIES } from './constants';

export const setMovies = movies => ({type: SET_MOVIES, movies});
export const setWatchedMovie = movie => ({type: SET_WATCHED_MOVIE, movie});
export const setWatchedMovieRatings = rating => ({type: SET_WATCHED_MOVIE_RATINGS, rating});
export const setWishedMovies = (movies, listId) => ({type: SET_WISHED_MOVIES, movies, listId});
export const clearWishedMovies = () => ({type: CLEAR_WISHED_MOVIES});
