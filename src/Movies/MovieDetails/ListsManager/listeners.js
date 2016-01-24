import { setLists, setEntries } from '../../actions/creators';
import firebase from '../../../utils/firebase';
import { values } from 'lodash';

export function registerListeners(dispatch, userId) {
  const listsRef = firebase.child(`lists/${userId}`);
  const entriesRef = firebase.child(`entries/${userId}`);
  listsRef.on('value', function(snap) {
    dispatch(setLists(values(snap.val())));
  });
  entriesRef.on('value', function(snap) {
    if (snap.exists()){
      dispatch(setEntries(snap.val()));
    } else {
      dispatch(setEntries([]));
    }
  });
}

export function unregisterListeners(dispatch, userId) {
  const listsRef = firebase.child(`lists/${userId}`);
  listsRef.off();
  dispatch(setLists([]));
}
