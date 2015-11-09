import { SET_DEFAULT_LISTS, CREATE_LIST, DELETE_LIST, EDIT_LIST, ADD_ELEMENT, REMOVE_ELEMENT } from '../actions';
import { getId, getSlug} from '../utils';
import { defaultLists } from '../utils/examples';

const setDefaultLists = state => Object.assign({}, state, defaultLists);

function createList(state, title, desc) {
  let id = getId();
  let slug = getSlug(state, title, id);
  let newList = {
    [id]:
      {
        title,
        slug,
        desc,
        custom: true
      }
    };
  return Object.assign({}, state, newList);
}

function deleteList(state, id){
  let newState = Object.assign({}, state);
  delete newState[id];
  return newState;
}

function editList(state, id, title, desc) {
  return state.map( lists => id === lists.id ? Object.assign({}, lists, { title, desc }) : lists );
}

function addElement(state, title){
  let id = getId();
  let newElement = {
    [id]:
    {
     title    }
  };
  Object.assign({}, state, newElement);
}

function removeElement(state, id) {
  let newState = Object.assign({}, state);
  delete newState[id];
  return newState;
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
      return editList(state, action.id, action.title, action.desc);
    case ADD_ELEMENT:
      return addElement(state, action.title);
    case REMOVE_ELEMENT:
      return removeElement(state, action.id);
    default:
      return state;
  }
}

