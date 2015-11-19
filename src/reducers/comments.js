import { SET_DEFAULT_COMMENT, CREATE_COMMENT, DELETE_COMMENT, EDIT_COMMENT, DELETE_LIST } from '../actions';
import { getId } from '../utils';
import _ from 'lodash';
import { defaultComments } from '../utils/examples';


const setDefaultComment = state => Object.assign({}, state, defaultComments);

function createComment(state, idCommented, text) {
  const id  = getId();
  let collectionComments = state[idCommented];
  collectionComments = collectionComments ? collectionComments : [];
  const newComment = { id, idCommented, text, time: new Date() };
  return Object.assign({}, state, { [idCommented] : [newComment].concat(collectionComments)});
}

function removeComment(state, id, idCommented){
  let collectionComments = state[idCommented];
  let comment = _.find(collectionComments, (comment) => comment.id === id);
  collectionComments = _.without(collectionComments, comment);
  return Object.assign({}, state, { [idCommented]: collectionComments });
}

function editComment(state, id, idCommented, text) {
  let collectionComments = state[idCommented];
  let comment = _.find(collectionComments, (comment) => comment.id === id);
  let position = collectionComments.indexOf(comment);
  let newComment = { id, text, time: comment.time, modified: new Date() };
  collectionComments = collectionComments.slice(0);
  collectionComments[position] = newComment;
  return Object.assign({}, state, { [idCommented] : collectionComments });
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
