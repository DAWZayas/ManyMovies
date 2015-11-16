import { SET_DEFAULT_ENTRIES, ADD_ENTRY, REMOVE_ENTRY, DELETE_LIST } from '../actions';
import _ from 'lodash';
import { defaultEntries } from '../utils/examples';

const setDefaultEntries = state => Object.assign({}, state, defaultEntries);

const addEntry = (state, idCollection, id) => {
  let collectionEntries = state[idCollection];
  collectionEntries = _.union(collectionEntries, [id]);
  return Object.assign({}, state, { [idCollection]: collectionEntries });
};

const removeEntry = (state, idCollection, id) => {
  let collectionEntries = state[idCollection];
  collectionEntries = _.without(collectionEntries, id);
  return Object.assign({}, state, { [idCollection]: collectionEntries });
};

const deleteList = (state, id) => {
  let newState = Object.assign({}, state);
  delete newState[id];
  return Object.assign({}, newState);
};

export default function (state = {}, action) {
  switch (action.type) {
    case SET_DEFAULT_ENTRIES:
      return setDefaultEntries(state);
    case ADD_ENTRY:
      return addEntry(state, action.idCollection, action.id);
    case REMOVE_ENTRY:
      return removeEntry(state, action.idCollection, action.id);
    case DELETE_LIST:
      return deleteList(state, action.id);
    default:
      return state;
  }
}

