import { SET_FOLLOWER_USERS, CLEAR_FOLLOWERS } from '../Friends/actions/constants';

const setFollowerUsers = users => ({ loading: false, users: [].concat(users) });

const initialState = { loading: true, users: [] };
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_FOLLOWER_USERS:
      return setFollowerUsers(action.users);
    case CLEAR_FOLLOWERS:
      return initialState;
    default:
      return state;
  }
}
