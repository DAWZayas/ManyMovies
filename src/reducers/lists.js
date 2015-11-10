import { SET_DEFAULT_LISTS, CREATE_LIST, DELETE_LIST, EDIT_LIST } from '../actions';
import { getId, getSlug} from '../utils';
import { createCustomList } from '../utils/lists';
import { defaultLists } from '../utils/examples';

const setDefaultLists = state => Object.assign({}, state, defaultLists);

function createList(state, title, desc) {
  let id = getId();
  let slug = getSlug({lists: state}, title, id);
  let newList = createCustomList(title, slug, desc);
  return Object.assign({}, state, { [id] : newList });
}

function deleteList(state, id){
  let newState = Object.assign({}, state);
  delete newState[id];
  return newState;
}

function editList(state, id, options) {
  let title = options.title || state[id].title;
  let desc = options.desc || state[id].desc;
  let slug = getSlug(state.lists, title, id);
  let newList = createCustomList(title, slug, desc);
  return Object.assign({}, state, { [id] : newList });
}

export default function (state = {}, action) {
  switch (action.type) {
    case SET_DEFAULT_LISTS:
      return setDefaultLists(state);
    case CREATE_LIST:
      return createList(state, action.title, action.desc);
    case DELETE_LIST:
      return deleteList(state, action.id);
    case EDIT_LIST:
      return editList(state, action.id, action.options);
    default:
      return state;
  }
}

