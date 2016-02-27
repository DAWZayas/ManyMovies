import { setUser } from './actions/creators';
import firebase from '../utils/firebase';

export function registerListeners(id, dispatch) {
  const ref = firebase.child(`users/${id}`);
  ref.on('value', snap => {
    const user = snap.val();
    dispatch(setUser(user));
  });
}

export function unregisterListeners(id, dispatch) {
  const ref = firebase.child(`users/${id}`);
  ref.off();
  dispatch(setUser({}));
}
