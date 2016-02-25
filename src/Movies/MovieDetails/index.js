import { connect } from 'react-redux';
import MovieDetails from './MovieDetails';
import { registerListeners, unregisterListeners } from './listeners';

function mapStateToProps(state) {
  const { watchedMovie, user } = state;
  return {
    movie: watchedMovie,
    user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    registerListeners: params => registerListeners(dispatch, params),
    unregisterListeners: params => unregisterListeners(dispatch, params)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieDetails);
