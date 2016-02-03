import { setMovies } from '../Movies/actions/creators';
import firebase from '../utils/firebase';

export function registerListeners(dispatch) {
  const ref = firebase.child('movies');
  ref.on('value', snapshot => dispatch(setMovies(snapshot.val())));
}

export function unregisterListeners(dispatch) {
  const ref = firebase.child('movies');
  ref.off();
  dispatch(setMovies({}));
}
