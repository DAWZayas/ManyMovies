import { setMovies, setWishedMovies, clearWishedMovies } from './actions/creators';
import { sortBy } from 'lodash';
import firebase from '../utils/firebase';
import { userUid } from '../utils';

export function registerListeners(dispatch, page, auth) {
  const today = new Date();
  const ref = firebase
                .child('movies')
                .orderByChild('released')
                .startAt(today.toISOString().substring(0, 9))
                .limitToFirst(15 * (page + 1));
  ref.once('value', snapshot => dispatch(setMovies(sortBy(snapshot.val(), 'released'))));

  if (auth.uid){
    const userId = userUid(auth.uid);
    const watchlistRef = firebase.child(`lists/${userId}/`).orderByChild('slug').equalTo('watchlist');
    watchlistRef.once('value', snapshot => {
      const listId = Object.keys(snapshot.val())[0];
      const watchlistEntries = firebase.child(`entries/${userId}/${listId}`);
      watchlistEntries.on('value', snapshot => {
        dispatch(setWishedMovies(snapshot.val() || {}, listId));
      });
    });
  }
}

export function unregisterListeners(dispatch, auth) {
  dispatch(setMovies({}));
  dispatch(clearWishedMovies());
  if (auth.uid){
    const userId = userUid(auth.uid);
    const watchlistRef = firebase.child(`lists/${userId}/`).orderByChild('slug').equalTo('watchlist');
    watchlistRef.once('value', snapshot => {
      const listId = Object.keys(snapshot.val())[0];
      const watchlistEntries = firebase.child(`entries/${userId}/${listId}`);
      watchlistEntries.off();
    });
  }
}
