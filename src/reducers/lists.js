import { SET_LISTS, CREATE_LIST, DELETE_LIST, EDIT_LIST } from '../actions';
import { getId, getSlug} from '../utils';

const setLists = (state, lists) => Object.assign({}, state, lists);

function createList(state, title, desc) {
  let id = getId();
  let slug = getSlug(state, title, id);
  let newList = { id, title, slug, desc, custom: true };
  return Object.assign({}, state, { [id] : newList });
}

function deleteList(state, id){
  let newState = Object.assign({}, state);
  delete newState[id];
  return newState;
}

function editList(state, id, title, desc) {
  let slug = getSlug(state.lists, title, id);
  let newList = { id, title, slug, desc, custom: true };
  return Object.assign({}, state, { [id] : newList });
}

export default function (state = {}, action) {
  switch (action.type) {
    case SET_LISTS:
      return setLists(state, action.lists);
    case CREATE_LIST:
      return createList(state, action.title, action.desc);
    case DELETE_LIST:
      return deleteList(state, action.id);
    case EDIT_LIST:
      return editList(state, action.id, action.title, action.desc);
    default:
      return state;
  }
}

