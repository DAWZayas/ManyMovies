import { setLists } from './actions/creators';
import { values } from 'lodash';
import firebase from '../utils/firebase';

export function registerListeners(dispatch, userId){
  const ref = firebase.child(`lists/${userId}`);
  ref.on('value', snapshot => dispatch(setLists(values(snapshot.val()))));
}

export function unregisterListeners(dispatch, userId){
  const ref = firebase.child(`lists/${userId}`);
  ref.off();
  dispatch(setLists([]));
}
