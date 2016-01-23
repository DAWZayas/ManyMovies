import { setWatchedList, setLists } from '../actions/creators';
import firebase from '../../utils/firebase';
import { values } from 'lodash';

export function registerListeners (dispatch, params) {
	const listRef = firebase.child('lists/Gotre1').orderByChild("slug").equalTo(params.listsSlug);
	listRef.on('value', function(snap) {
		dispatch(setWatchedList(values(snap.val())[0]));
		const ref = firebase.child('lists/Gotre1');
		ref.on('value', snapshot => dispatch(setLists(values(snapshot.val()))));
  });
}

export function unregisterListeners (params){
	const listRef = firebase.child('lists/Gotre1').orderByChild("slug").equalTo(params.listsSlug);
	listRef.off();
}
