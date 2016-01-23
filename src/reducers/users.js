import { SET_DEFAULT_USERS, EDIT_USER } from '../actions';
import { defaultUsers } from '../utils/examples';
import { SET_AUTH_DATA } from '../Login/actions/constants';

const setAuthData = authData => Object.assign({}, authData);

const setDefaulUsers = state => Object.assign({}, state, defaultUsers);

function editUser(state, user, newStats) {
  let newUser = Object.assign({}, user, newStats);
  return Object.assign({}, state, { [user.userName] : newUser });
}

export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH_DATA:
      return setAuthData(action.authData);
    case SET_DEFAULT_USERS:
      return setDefaulUsers(state);
    case EDIT_USER:
      return editUser(state, action.user, action.newStats);
    default:
      return state;
  }
}


