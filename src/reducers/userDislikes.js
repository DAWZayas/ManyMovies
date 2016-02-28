import { SET_USER_DISLIKES } from '../Comments/actions/constants';

const setUserDislikes = dislikes => Object.assign({}, dislikes);

export default function (state = {}, action) {
  switch (action.type) {
    case SET_USER_DISLIKES:
      return setUserDislikes(action.dislikes);
    default:
      return state;
  }
}
