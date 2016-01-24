import { DELETE_LIST } from '../actions';
import { SET_ENTRIES } from '../Movies/actions/constants';

const setEntries = entries => Object.assign({}, entries);

const deleteList = (state, id) => {
  let newState = Object.assign({}, state);
  delete newState[id];
  return Object.assign({}, newState);
};

export default function (state = {}, action) {
  switch (action.type) {
    case SET_ENTRIES:
      return setEntries(action.entries);
    case DELETE_LIST:
      return deleteList(state, action.id);
    default:
      return state;
  }
}

