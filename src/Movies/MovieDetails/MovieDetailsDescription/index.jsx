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
    rateMovie: ( userName, idMovie, rating) => rateMovie(userName, idMovie, rating),
    changeMovieRating: (userName, idMovie, oldRating, newRating) => changeMovieRating(userName, idMovie, oldRating, newRating)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieDetailsDescription);
