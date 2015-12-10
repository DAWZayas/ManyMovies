import { LIKE_COMMENT, UNLIKE_COMMENT } from '../actions';
import _ from 'lodash';

function likeComment(state, userId, commentId) {
  const likes = state[userId] || [];
  const likesWithComment = likes.concat([commentId]);
  return Object.assign({}, state, { [userId] : likesWithComment });
}

function unlikeComment(state, userId, commentId){
  const likes = state[userId] || [];
  const likesWithoutComment = _.without(likes, commentId);
  return Object.assign({}, state, {[userId] : likesWithoutComment});
}

export default function (state = {}, action) {
  switch (action.type) {
    case LIKE_COMMENT:
      return likeComment(state, action.userId, action.id);
    case UNLIKE_COMMENT:
      return unlikeComment(state, action.userId, action.id);
    default:
      return state;
  }
}


