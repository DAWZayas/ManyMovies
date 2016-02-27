import { SET_WATCHED_USER } from '../UserInfo/actions/constants';

const setWatchedUser = watchedUser => Object.assign({}, watchedUser);

export default function (state = {}, action) {
  switch (action.type) {
    case SET_WATCHED_USER:
      return setWatchedUser(action.watchedUser);
    default:
      return state;
  }
}
