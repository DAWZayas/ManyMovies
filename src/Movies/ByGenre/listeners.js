import { setMovies } from '../actions/creators';
import { sortBy } from 'lodash';
import firebase from '../../utils/firebase';

export function registerListeners(dispatch, genre, page) {
  const ref = firebase
                .child('movies')
                .orderByChild('genre_title')
                .startAt(genre)
                .endAt(`${genre}\uf8ff`)
                .limitToFirst(15 * (page + 1));
  ref.once('value', snapshot => dispatch(setMovies(sortBy(snapshot.val(), 'title'))));
}

export function unregisterListeners(dispatch) {
  dispatch(setMovies({}));
}
