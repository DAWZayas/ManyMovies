import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { setPosts } from '../actions';
import _ from 'lodash';
import firebase from '../utils/firebase';
import News from '../components/News';

function mapStateToProps(state) {
  const { posts } = state;
  return {
    posts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    navigate: path => dispatch(pushState(null, path)),
    registerListeners: () => registerListeners(dispatch),
    unregisterListeners: () => unregisterListeners(dispatch)
  };
}

function registerListeners(dispatch) {
  const ref = firebase.child('posts');
  ref.on('value', snapshot => dispatch(setPosts(_.values(snapshot.val()))));
}

function unregisterListeners(dispatch) {
  const ref = firebase.child('posts');
  ref.off();
  dispatch(setPosts([]));
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(News);
