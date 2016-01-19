import { SET_COMMENTS } from '../Comments/actions/constants';

const setComments = comments => [].concat(comments);

export default function (state = [], action) {
  switch (action.type) {
    case SET_COMMENTS:
      return setComments(action.comments);
    default:
      return state;
  }
}
