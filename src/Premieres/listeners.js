import { setMovies } from './actions/creators';
import { sortBy } from 'lodash';
import firebase from '../utils/firebase';

export function registerListeners(dispatch, page) {
  const today = new Date();
  const ref = firebase
                .child('movies')
                .orderByChild('released')
                .startAt(today.toISOString().substring(0, 9))
                .limitToFirst(15 * (page + 1));
  ref.once('value', snapshot => dispatch(setMovies(sortBy(snapshot.val(), 'released'))));
}

export function unregisterListeners(dispatch) {
  dispatch(setMovies({}));
}
