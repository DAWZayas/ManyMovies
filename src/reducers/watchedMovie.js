import { SET_WATCHED_MOVIE } from '../Movies/actions/constants';

const setWatchedMovie = movie => Object.assign({}, movie);

export default function (state = {}, action) {
  switch (action.type) {
    case SET_WATCHED_MOVIE:
      return setWatchedMovie(action.movie);
    default:
      return state;
  }
}
