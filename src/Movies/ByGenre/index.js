import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { registerListeners, unregisterListeners } from './listeners';
import Movies from './ByGenre';

function mapStateToProps(state) {
  const { movies, user } = state;
  return {
    movies,
    user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    navigate: path => dispatch(pushState(null, path)),
    registerListeners: (genre, page) => registerListeners(dispatch, genre, page),
    unregisterListeners: () => unregisterListeners(dispatch)

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Movies);
