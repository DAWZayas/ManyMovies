import { connect } from 'react-redux';
import MovieDetailsDescription from './MovieDetailsDescription';
import { registerListeners, unregisterListeners } from './listeners';
import { rateMovie, changeMovieRating } from './side-actions.js';

function mapStateToProps(state) {
  const user = state.users.Gotre;
  const { userRatings } = state;
  return { user, userRating: userRatings };
}

function mapDispatchToProps(dispatch) {
  return {
    registerListeners: ( idMovie, userId ) => registerListeners(dispatch, idMovie, userId),
    unregisterListeners: ( idMovie, userId ) => unregisterListeners(dispatch, idMovie, userId),
    changeMovieRating: (...args) => changeMovieRating(...args),
    rateMovie: (...args) => rateMovie(...args)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieDetailsDescription);
