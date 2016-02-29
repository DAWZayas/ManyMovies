import { setWatchedPeople } from './actions/creators';
import { sortBy, values } from 'lodash';
import firebase from '../utils/firebase';

export function searchPeople(term, callback, dispatch) {
  if (term === ''){
    dispatch(setWatchedPeople([]));
    callback();
    return;
  }
  const ref = firebase
                .child('users')
                .orderByChild('displayName')
                .startAt(term)
                .endAt(`${term}\uf8ff`)
                .limitToFirst(15);
  ref.once('value', snapshot => {
    dispatch(setWatchedPeople(sortBy(values(snapshot.val()), 'displayName')));
    callback();
   });
}


