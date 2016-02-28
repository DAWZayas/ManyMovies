import { setWatchedPost, setWatchedPostImg, clearWatchedPost } from '../actions/creators';
import firebase from '../../utils/firebase';

export function registerListeners(dispatch, params) {
  const postRef = firebase.child("posts").orderByChild("slug").equalTo(params.newsSlug);
  postRef.on("child_added", function(snap) {
    const post = snap.val();
    dispatch(setWatchedPost(post));
    const { id } = post;
    const imageRef = firebase.child(`images/${id}`);
    imageRef.on('value', snapshot => dispatch(setWatchedPostImg(snapshot.val())));
  });
}

export function unregisterListeners(dispatch, params, id) {
  dispatch(clearWatchedPost());
  const ref = firebase.child("posts").orderByChild("slug").equalTo(params.newsSlug);
  const imageRef = firebase.child(`images/${id}`);
  imageRef.off();
  ref.off();
}
