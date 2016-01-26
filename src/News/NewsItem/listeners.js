import { setPostImg } from '../actions/creators';
import firebase from '../../utils/firebase';

export function registerListeners(dispatch, id) {
  const ref = firebase.child(`images/${id}`);
  ref.on('value', snapshot => dispatch(setPostImg(id, snapshot.val())));
}

export function unregisterListeners(id) {
  const ref = firebase.child(`images/${id}`);
  ref.off();
}
