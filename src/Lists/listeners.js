import { setLists } from './actions/creators';
import firebase from '../utils/firebase';

export function registerListeners(dispatch){
  const ref = firebase.child('lists/Gotre');
  ref.on('value', snapshot => dispatch(setLists(snapshot.val())));
}

export function unregisterListeners(dispatch){
  const ref = firebase.child('lists/Gotre');
  ref.off();
  dispatch(setLists({}));
}
