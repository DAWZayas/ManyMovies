import { setWatchedList, setWatchedEntries } from '../actions/creators';
import firebase from '../../utils/firebase';
import { values } from 'lodash';

export function registerListeners (dispatch, params) {
  const listRef = firebase.child(`lists/${params.user}`).orderByChild('slug').equalTo(params.listsSlug);
	listRef.on('value', function(snap) {
    const list = values(snap.val())[0];
		dispatch(setWatchedList(list));
    const entriesRef = firebase.child(`entries/${params.user}/${list.id}`);
    entriesRef.on('value', snap => {
      const promises = Object.keys(snap.val() || []).map( movieId => new Promise(
        resolve => firebase.child(`movies/${movieId}`).once('value', snapshot => resolve(snapshot.val()))
      ));
      Promise.all(promises).then(function(movies) {
        dispatch(setWatchedEntries(movies));
      });
    });
  });
}

export function unregisterListeners (dispatch, params, listId){
	const listRef = firebase.child(`lists/${params.user}`).orderByChild('slug').equalTo(params.listsSlug);
  const entriesRef = firebase.child(`entries/${params.user}/${listId}`);
  entriesRef.off();
  listRef.off();
  dispatch(setWatchedEntries({}));
  dispatch(setWatchedList({}));
}
