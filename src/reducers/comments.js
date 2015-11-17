import { SET_DEFAULT_COMMENT, CREATE_COMMENT, DELETE_COMMENT, EDIT_COMMENT, DELETE_LIST } from '../actions';
import { getId } from '../utils';
//import _ from 'lodash';
import { defaultComments } from '../utils/examples';


const setDefaultComment = state => Object.assign({}, state, defaultComments);

function createComment(state, idCommented, text) {
  const id  = getId();
  const newComment = { id, idCommented, text };
  return Object.assign({}, state, { [idCommented] : newComment });
}

function removeComment(state, id, idCommented){
  let collectionComments = state[idCommented];
  //----- filter collectionComments = _.without(collectionComments, id)
  return Object.assign({}, state, { [idCommented]: collectionComments });
}

function editComment(state, id, idCommented, text) {
  let newComment = { idCommented, text };
  return Object.assign({}, state, { [id] : newComment });
}

function deleteList(state, id) {
  let newState = Object.assign({}, state);
  delete newState[id];
  return Object.assign({}, newState);
}

export default function (state = {}, action) {
  switch (action.type) {
    case SET_DEFAULT_COMMENT:
      return setDefaultComment(state);
    case CREATE_COMMENT:
      return createComment (state, action.idCommented, action.text);
    case DELETE_COMMENT:
      return removeComment(state, action.id, action.idCommented);
    case EDIT_COMMENT:
      return editComment(state, action.id, action.idCommented, action.text);
      case DELETE_LIST:
      return deleteList(state, action.id);
    default:
      return state;
  }
}
