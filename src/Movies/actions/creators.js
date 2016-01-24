import { SET_MOVIES, SET_WATCHED_MOVIE, SET_WATCHED_MOVIE_RATINGS } from './constants';

export const setMovies = movies => ({type: SET_MOVIES, movies});
export const setWatchedMovie = movie => ({type: SET_WATCHED_MOVIE, movie});
export const setWatchedMovieRatings = rating => ({type: SET_WATCHED_MOVIE_RATINGS, rating});
