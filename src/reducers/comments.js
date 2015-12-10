import { SET_DEFAULT_COMMENT, CREATE_COMMENT, DELETE_COMMENT, EDIT_COMMENT, DELETE_LIST, LIKE_COMMENT, UNLIKE_COMMENT, UNDISLIKE_COMMENT, DISLIKE_COMMENT } from '../actions';
import { getId } from '../utils';
import _ from 'lodash';
import { defaultComments } from '../utils/examples';


const setDefaultComment = state => Object.assign({}, state, defaultComments);

function createComment(state, idCommented, text, userName) {
  const id  = getId();
  let collectionComments = state[idCommented];
  collectionComments = collectionComments ? collectionComments : [];
  const newComment = { id, idCommented, text, userName, time: new Date(), likes: 0, dislikes: 0 };
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
  let newComment = Object.assign({}, comment, {text, modified: new Date()});
  collectionComments = collectionComments.slice(0);
  collectionComments[position] = newComment;
  return Object.assign({}, state, { [idCommented] : collectionComments });
}

function deleteList(state, id) {
  let newState = Object.assign({}, state);
  delete newState[id];
  return Object.assign({}, newState);
}

function likeComment(state, id, idCommented){
  let collectionComments = state[idCommented];
  let comment = _.find(collectionComments, (comment) => comment.id === id);
  let position = collectionComments.indexOf(comment);
  let newComment = Object.assign({}, comment, { likes: comment.likes + 1 });
  collectionComments = collectionComments.slice(0);
  collectionComments[position] = newComment;
  return Object.assign({}, state, { [idCommented] : collectionComments });
}

function unlikeComment(state, id, idCommented){
  let collectionComments = state[idCommented];
  let comment = _.find(collectionComments, (comment) => comment.id === id);
  let position = collectionComments.indexOf(comment);
  let newComment = Object.assign({}, comment, { likes: comment.likes - 1 });
  collectionComments = collectionComments.slice(0);
  collectionComments[position] = newComment;
  return Object.assign({}, state, { [idCommented] : collectionComments });
}

function dislikeComment(state, id, idCommented){
  let collectionComments = state[idCommented];
  let comment = _.find(collectionComments, (comment) => comment.id === id);
  let position = collectionComments.indexOf(comment);
  let newComment = Object.assign({}, comment, { dislikes: comment.dislikes + 1 });
  collectionComments = collectionComments.slice(0);
  collectionComments[position] = newComment;
  return Object.assign({}, state, { [idCommented] : collectionComments });
}

function undislikeComment(state, id, idCommented){
  let collectionComments = state[idCommented];
  let comment = _.find(collectionComments, (comment) => comment.id === id);
  let position = collectionComments.indexOf(comment);
  let newComment = Object.assign({}, comment, { dislikes: comment.dislikes - 1 });
  collectionComments = collectionComments.slice(0);
  collectionComments[position] = newComment;
  return Object.assign({}, state, { [idCommented] : collectionComments });
}

export default function (state = {}, action) {
  switch (action.type) {
    case SET_DEFAULT_COMMENT:
      return setDefaultComment(state);
    case CREATE_COMMENT:
      return createComment (state, action.idCommented, action.text, action.userName);
    case DELETE_COMMENT:
      return removeComment(state, action.id, action.idCommented);
    case EDIT_COMMENT:
      return editComment(state, action.id, action.idCommented, action.text);
    case DELETE_LIST:
      return deleteList(state, action.id);
    case LIKE_COMMENT:
      return likeComment(state, action.id, action.idCommented);
    case UNLIKE_COMMENT:
      return unlikeComment(state, action.id, action.idCommented);
    case DISLIKE_COMMENT:
      return dislikeComment(state, action.id, action.idCommented);
    case UNDISLIKE_COMMENT:
      return undislikeComment(state, action.id, action.idCommented);
    default:
      return state;
  }
}
