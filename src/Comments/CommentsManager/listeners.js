import firebase from '../../utils/firebase';
import { setUserLikes, setUserDislikes, setComments } from '../actions/creators';
import { values } from 'lodash';

export function registerListeners(dispatch, userId, idCommented) {
  const commentsRef = firebase.child(`comments/${idCommented}`);
  const likesRef = firebase.child(`userLikes/${userId}/${idCommented}`);
  const dislikesRef = firebase.child(`userDislikes/${userId}/${idCommented}`);
  likesRef.on('value', snapshot => dispatch(setUserLikes(snapshot.val())));
  dislikesRef.on('value', snapshot => dispatch(setUserDislikes(snapshot.val())));
  commentsRef.orderByChild('time').on('value', snapshot => {
    const val = snapshot.val();
    const comments = val !== null ? val : [];
    return dispatch(setComments(values(comments).reverse()));
  });
}

export function unregisterListeners(dispatch, userId, idCommented) {
  const commentsRef = firebase.child(`comments/${idCommented}`);
  const likesRef = firebase.child(`userLikes/${userId}/${idCommented}`);
  const dislikesRef = firebase.child(`userDislikes/${userId}/${idCommented}`);
  likesRef.off();
  dislikesRef.off();
  commentsRef.off();
  dispatch(setUserLikes([]));
  dispatch(setUserDislikes([]));
}
