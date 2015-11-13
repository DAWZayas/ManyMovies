import { SET_DEFAULT_MOVIES } from '../actions';
import { defaultMovies } from '../utils/examples';

const setDefaultMovies = state => Object.assign({}, state, defaultMovies);

export default function (state = {}, action) {
  switch (action.type) {
    case SET_DEFAULT_MOVIES:
      return setDefaultMovies(state);
    default:
      return state;
  }
}
