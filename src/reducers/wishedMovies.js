import { SET_WISHED_MOVIES, CLEAR_WISHED_MOVIES } from '../Premieres/actions/constants';

const setWishedMovies = (movies, listId) => ({ loading: false, movies: Object.assign({}, movies), listId });

const initialState = { loading: true, users: [], listId: '' };
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_WISHED_MOVIES:
      return setWishedMovies(action.movies, action.listId);
    case CLEAR_WISHED_MOVIES:
      return initialState;
    default:
      return state;
  }
}
