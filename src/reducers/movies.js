import { SET_DEFAULT_MOVIES, RATE_MOVIE, CHANGE_MOVIE_RATING } from '../actions';
import { defaultMovies } from '../utils/examples';

const setDefaultMovies = state => Object.assign({}, state, defaultMovies);

const rateMovie = ( state, idMovie, rating) => {
  const movie = state[idMovie];
  const ratedMovie = Object.assign({}, movie, {votes: movie.votes + 1, totalRating: movie.totalRating + rating});
  return Object.assign({}, state, {[idMovie]: ratedMovie});
};

const changeMovieRating = ( state, idMovie, oldVote, newVote) => {
  const movie = state[idMovie];
  const diff = newVote - oldVote;
  const ratedMovie = Object.assign({}, movie, {totalRating: movie.totalRating + diff});
  return Object.assign({}, state, {[idMovie]: ratedMovie});
};

export default function (state = {}, action) {
  switch (action.type) {
    case SET_DEFAULT_MOVIES:
      return setDefaultMovies(state);
    case RATE_MOVIE:
      return rateMovie(state, action.idMovie, action.rating);
    case CHANGE_MOVIE_RATING:
      return changeMovieRating(state, action.idMovie, action.oldVote, action.rating);
    default:
      return state;
  }
}
