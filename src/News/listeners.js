import { setPosts } from './actions/creators';
import { values } from 'lodash';
import firebase from '../utils/firebase';

export function registerListeners(dispatch) {
  const ref = firebase.child('posts');
  ref.on('value', snapshot => dispatch(setPosts(values(snapshot.val()))));
}

export function unregisterListeners(dispatch) {
  const ref = firebase.child('posts');
  ref.off();
  dispatch(setPosts([]));
}
