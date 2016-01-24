import { setWatchedMovie } from '../actions/creators';
import firebase from '../../utils/firebase';
import { values } from 'lodash';

export function registerListeners(dispatch, params) {
  const movieRef = firebase.child('movies').orderByChild('slug').equalTo(params.movieSlug);
  movieRef.on('value', function(snap) {
    const movie = snap.val();
    dispatch(setWatchedMovie(values(movie)[0]));
  });
}

export function unregisterListeners(dispatch, params) {
  const movieRef = firebase.child('movies').orderByChild('slug').equalTo(params.movieSlug);
  movieRef.off();
  dispatch(setWatchedMovie({}));
}
