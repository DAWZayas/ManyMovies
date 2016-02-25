import { SET_USER } from './actions/constants';
import firebase from '../utils/firebase';

export function registerListeners(id, dispatch) {
  const ref = firebase.child(`users/${id}`);
  ref.on('value', snap => {
    if (snap.exists()){
      dispatch({type: SET_USER, user: snap.val() });
    }
  });
}

export function unregisterListeners(id, dispatch) {
  const ref = firebase.child(`users/${id}`);
  ref.off();
  dispatch({type: SET_USER, user: {} });
}
