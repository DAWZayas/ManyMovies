import { setLists } from '../actions/creators';
import firebase from '../../utils/firebase';
import { values } from 'lodash';

export function registerListeners(dispatch){
  const ref = firebase.child('lists/Gotre1');
  ref.on('value', snapshot => dispatch(setLists(values(snapshot.val()))));
}

export function unregisterListeners(dispatch){
  const ref = firebase.child('lists/Gotre1');
  ref.off();
  dispatch(setLists([]));
}
