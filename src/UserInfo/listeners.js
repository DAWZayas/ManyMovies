import { setWatchedUser } from './actions/creators';
import { setLists} from '../Lists/actions/creators';
import firebase from '../utils/firebase';
import { values } from 'lodash';

export function registerListeners(dispatch, params) {
  const ref = firebase.child(`users/${params.idUser}`);
  ref.on('value', snapshot => dispatch(setWatchedUser(snapshot.val())));
  const refList = firebase.child(`lists/${params.idUser}`);
  refList.on('value', snapshot => dispatch(setLists(values(snapshot.val()))));
}

export function unregisterListeners(dispatch, params) {
  const ref = firebase.child(`users/${params.idUser}`);
  const refList = firebase.child(`lists/${params.idUser}`);
  ref.off();
  refList.off();
  dispatch(setWatchedUser({}));
}
