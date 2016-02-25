import { INIT_USER, SIGN_IN_SUCCESS, LOG_OUT_SUCCESS} from '../Login/actions/constants';

function initUser(authData) {
  if (authData !== null){
    return signInSuccess(authData);
  } else {
    return {};
  }
}

function signInSuccess(authData) {
  return Object.assign({}, authData);
}

function logOutSuccess() {
  return {};
}

export default function (state = {}, action) {
  switch (action.type) {
    case INIT_USER:
      return initUser(action.authData);
    case SIGN_IN_SUCCESS:
      return signInSuccess(action.authData);
    case LOG_OUT_SUCCESS:
      return logOutSuccess();
    default:
      return state;
  }
}
