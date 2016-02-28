import { SET_WATCHED_USER_FOLLOWING, CLEAR_WATCHED_USER_FOLLOWING } from '../UserInfo/actions/constants';

const setWatchedUserFollowing = users => ({ loading: false, users: [].concat(users) });

const initialState = { loading: true, users: [] };

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_WATCHED_USER_FOLLOWING:
      return setWatchedUserFollowing(action.users);
    case CLEAR_WATCHED_USER_FOLLOWING:
      return initialState;
    default:
      return state;
  }
}
