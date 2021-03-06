import { SET_WATCHED_USER_FOLLOWERS, CLEAR_WATCHED_USER_FOLLOWERS } from '../UserInfo/actions/constants';

const setWatchedUserFollowers = users => ({ loading: false, users: [].concat(users) });

const initialState = { loading: true, users: [] };

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_WATCHED_USER_FOLLOWERS:
      return setWatchedUserFollowers(action.users);
    case CLEAR_WATCHED_USER_FOLLOWERS:
      return initialState;
    default:
      return state;
  }
}
