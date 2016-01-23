import { SET_MOVIES } from '../Movies/actions/constants';

const setMovies = movies => Object.assign({}, movies);

export default function (state = {}, action) {
  switch (action.type) {
    case SET_MOVIES:
      return setMovies(action.movies);
    default:
      return state;
  }
}
