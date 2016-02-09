import { setUser } from './actions/creators';
import { userUid } from '../utils';
import firebase from '../utils/firebase';

export function registerListeners(dispatch) {
  const uid = userUid(firebase.getAuth().uid);
  const ref = firebase.child(`users/${uid}`);
  ref.on('value', snap => dispatch(setUser(snap.val())));
}

export function unregisterListeners(dispatch) {
	const uid = userUid(firebase.getAuth().uid);
  const ref = firebase.child(`users/${uid}`);
  ref.off();
  dispatch(setUser({}));
}
