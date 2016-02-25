import { pushState } from 'redux-router';

export function viewProfile(dispatch) {
  dispatch(pushState(null, '/'));
}
