import { RATE_MOVIE, CHANGE_MOVIE_RATING } from '../actions';

function rateMovie(state, userName, idMovie, rating) {
  const userRatings = state[userName] || {};
  const newUserRatings = Object.assign({}, userRatings, {[idMovie] : rating});
  return Object.assign({}, state, {[userName]: newUserRatings});
}

export default function (state = {}, action) {
  switch (action.type) {
    case RATE_MOVIE:
    case CHANGE_MOVIE_RATING:
      return rateMovie(state, action.userName, action.idMovie, action.rating);
    default:
      return state;
  }
}
