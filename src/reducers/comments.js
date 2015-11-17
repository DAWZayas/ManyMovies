import { CREATE_COMMENT, DELETE_COMMENT, EDIT_COMMENT } from '../actions';
import { getId } from '../utils';


function createComment(state, idCommented, text) {
  const id  = getId();
  const newComment = { id, idCommented, text };
  return Object.assign({}, state, { [idCommented] : newComment });
}

function deleteComment(state, id){
  let newState = Object.assign({}, state);
  delete newState[idComment];
  return newState;
}

function editComment(state,idUser, idComment, text) {
  let newComment = { idComment, text };
  return Object.assign({}, state, { [idComment] : newList });
}

export default function (state = {}, action) {
  switch (action.type) {
    case CREATE_COMMENT:
      return createComment (state, action.idUser, action.idComment, action.text);
    case DELETE_COMMENT:
      return deleteComment(state, action.idComment);
    case EDIT_COMMENT:
      return editComment(state, action.idUser, action.idComment, action.text);
    default:
      return state;
  }
}
