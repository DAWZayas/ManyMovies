import { SET_WATCHED_MOVIE_RATINGS } from '../Movies/actions/constants';

const setWatchedMovieRatings = rating => rating;

export default function (state = null, action) {
  switch (action.type) {
    case SET_WATCHED_MOVIE_RATINGS:
      return setWatchedMovieRatings(action.rating);
    default:
      return state;
  }
}
