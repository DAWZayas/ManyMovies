import { setMovies } from './actions/creators';
import { sortBy } from 'lodash';
import firebase from '../utils/firebase';

export function registerListeners(dispatch, title, page) {
  const ref = firebase
                .child('movies')
                .orderByChild('title')
                .startAt(title)
                .endAt(`${title}\uf8ff`)
                .limitToFirst(15 * (page + 1));
  ref.once('value', snapshot => dispatch(setMovies(sortBy(snapshot.val(), 'title'))));
}

export function unregisterListeners(dispatch) {
  dispatch(setMovies({}));
}
