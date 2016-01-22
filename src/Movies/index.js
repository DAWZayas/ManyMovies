import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { registerListeners, unregisterListeners } from './listeners';
import Movies from './Movies';

function mapStateToProps(state) {
  const { movies } = state;
  return {
    movies
  };
}

function mapDispatchToProps(dispatch) {
  return {
    navigate: path => dispatch(pushState(null, path)),
    registerListeners: (title, page) => registerListeners(dispatch, title, page),
    unregisterListeners: () => unregisterListeners(dispatch)

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Movies);
