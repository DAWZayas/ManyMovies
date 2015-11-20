import { SET_DEFAULT_USERS, EDIT_USER } from '../actions';
import { defaultUsers } from '../utils/examples';

const setDefaulUsers = state => Object.assign({}, state, defaultUsers);

function editUser(state, userName, displayName) {
  let newUser = {userName, displayName };
  return Object.assign({}, state, { [userName] : newUser });
}

export default function (state = {}, action) {
  switch (action.type) {
    case SET_DEFAULT_USERS:
      return setDefaulUsers(state);
    case EDIT_USER:
      return editUser(state, action.userName, action.displayName);
    default:
      return state;
  }
}


