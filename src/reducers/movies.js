import { SET_MOVIES } from '../Movies/actions/constants';
import { RATE_MOVIE, CHANGE_MOVIE_RATING } from '../actions';

const setMovies = movies => Object.assign({}, movies);

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
    case SET_MOVIES:
      return setMovies(action.movies);
    case RATE_MOVIE:
      return rateMovie(state, action.idMovie, action.rating);
    case CHANGE_MOVIE_RATING:
      return changeMovieRating(state, action.idMovie, action.oldVote, action.rating);
    default:
      return state;
  }
}
