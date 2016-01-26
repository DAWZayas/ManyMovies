import { setWatchedMovieRatings } from '../../actions/creators';
import firebase from '../../../utils/firebase';

export function registerListeners(dispatch, idMovie, userId) {
  const userRatings = firebase.child(`userRatings/${userId}/${idMovie}`);
  userRatings.on('value', function(snap) {
    const rating = snap.val();
    dispatch(setWatchedMovieRatings(rating));
  });
}

export function unregisterListeners(dispatch, idMovie, userId) {
  const userRatings = firebase.child(`userRatings/${userId}/${idMovie}`);
  userRatings.off();
  dispatch(setWatchedMovieRatings(null));
}
