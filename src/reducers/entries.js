import { SET_DEFAULT_ENTRIES, ADD_ENTRY, REMOVE_ENTRY } from '../actions';
import { getId } from '../utils';
import { defaultEntries } from '../utils/examples';

const setDefaultEntries = state => Object.assign({}, state, defaultEntries);


export default function (state = {}, action) {
  switch (action.type) {
    case SET_DEFAULT_ENTRIES:
      return setDefaultEntries(state);
    case ADD_ENTRY:
      return addEntry(state, action.entry);
    case DELETE_LIST:
      return deleteList(state, action.id);
    case EDIT_LIST:
      return editList(state, action.id, action.options);
    default:
      return state;
  }
}

