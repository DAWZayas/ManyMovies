import { DISLIKE_COMMENT, UNDISLIKE_COMMENT } from '../actions';
import _ from 'lodash';

function dislikeComment(state, userId, commentId) {
  const dislikes = state[userId] || [];
  const dislikesWithComment = dislikes.concat([commentId]);
  return Object.assign({}, state, { [userId] : dislikesWithComment });
}

function undislikeComment(state, userId, commentId){
  const dislikes = state[userId] || [];
  const dislikesWithoutComment = _.without(dislikes, commentId);
  return Object.assign({}, state, {[userId] : dislikesWithoutComment});
}

export default function (state = {}, action) {
  switch (action.type) {
    case DISLIKE_COMMENT:
      return dislikeComment(state, action.userId, action.id);
    case UNDISLIKE_COMMENT:
      return undislikeComment(state, action.userId, action.id);
    default:
      return state;
  }
}


