import { SET_USER_LIKES } from '../Comments/actions/constants';

const setUserLikes = likes => Object.assign({}, likes);

export default function (state = {}, action) {
  switch (action.type) {
    case SET_USER_LIKES:
      return setUserLikes(action.likes);
    default:
      return state;
  }
}
