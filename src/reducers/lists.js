import { SET_DEFAULT_LISTS, CREATE_LIST, DELETE_LIST } from '../actions';
import { getId, getSlug} from '../utils';

const setDefaultLists = (state, lists) => Object.assign({}, lists);

function createList(state, title, desc) {
  let id = getId();
  let slug = getSlug(state, title, id);
  let newList = {
    [id]:
      {
        title,
        desc,
        slug,
        custom: true
      }
    };
  Object.assign({}, state, newList);
}

function deleteList(state, id){
  let newState = Object.assign({}, state);
  delete newState[id];
  return newState;
}

export default function (state = {}, action) {
  switch (action.type) {
    case SET_DEFAULT_LISTS:
      return setDefaultLists(state, action.lists);
    case CREATE_LIST:
      return createList(state, action.title, action.desc);
    case DELETE_LIST:
      return deleteList(state, action.id);
    default:
      return state;
  }
}
