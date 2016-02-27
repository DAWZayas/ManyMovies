import { SET_FOLLOWING_USERS, CLEAR_FOLLOWING } from '../Friends/actions/constants';

const setFollowingUsers = users => ({ loading: false, users: [].concat(users) });

const initialState = { loading: true, users: [] };
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_FOLLOWING_USERS:
      return setFollowingUsers(action.users);
    case CLEAR_FOLLOWING:
      return initialState;
    default:
      return state;
  }
}
