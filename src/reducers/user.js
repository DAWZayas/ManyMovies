import { SET_USER } from '../Profile/actions/constants';

const setUser = user => Object.assign({}, user);

export default function (state = {}, action) {
  switch (action.type) {
    case SET_USER:
      return setUser(action.user);
    default:
      return state;
  }
}


