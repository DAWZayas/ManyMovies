import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { setWatchedPost, setWatchedPostImg, clearWatchedPost } from '../actions';
import NewsDetails from '../components/NewsDetails';
import firebase from '../utils/firebase';

function mapStateToProps(state) {
  const { watchedPost } = state;
  return {
    post: watchedPost, comments: []
  };
}

function mapDispatchToProps(dispatch) {
  return {
    navigate: path => dispatch(pushState(null, path)),
    registerListeners: params => registerListeners(dispatch, params),
    unregisterListeners: (params, idImage) => unregisterListeners(dispatch, params, idImage)
  };
}

function registerListeners(dispatch, params) {
  const postRef = firebase.child("posts").orderByChild("slug").equalTo(params.newsSlug);
  postRef.on("child_added", function(snap) {
    const post = snap.val();
    const { id } = post;
    const imageRef = firebase.child(`images/${id}`);
    dispatch(setWatchedPost(snap.val()));
    imageRef.on('value', snapshot => dispatch(setWatchedPostImg(snapshot.val())));
  });
}

function unregisterListeners(dispatch, params, id) {
  dispatch(clearWatchedPost());
  const ref = firebase.child("posts").orderByChild("slug").equalTo(params.newsSlug);
  const imageRef = firebase.child(`images/${id}`);
  imageRef.off();
  ref.off();
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsDetails);
