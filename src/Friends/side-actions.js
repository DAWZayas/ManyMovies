import { setWatchedPeople } from './actions/creators';
import { sortBy, values } from 'lodash';
import firebase from '../utils/firebase';

export function searchPeople(term, dispatch) {
  if (term === ''){
    dispatch(setWatchedPeople([]));
    return;
  }
  const ref = firebase
                .child('users')
                .orderByChild('displayName')
                .startAt(term)
                .endAt(`${term}\uf8ff`)
                .limitToFirst(15);
  ref.once('value', snapshot => dispatch(setWatchedPeople(sortBy(values(snapshot.val()), 'displayName'))));
}


