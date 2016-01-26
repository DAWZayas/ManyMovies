import { connect } from 'react-redux';
import MovieDetailsDescription from './MovieDetailsDescription';
import { registerListeners, unregisterListeners } from './listeners';
import { rateMovie, changeMovieRating } from './side-actions.js';
import { throttle } from 'lodash';

function mapStateToProps(state) {
  const user = state.users.Gotre;
  const { userRatings } = state;
  return { user, userRating: userRatings };
}

function mapDispatchToProps(dispatch) {
  return {
    registerListeners: ( idMovie, userId ) => registerListeners(dispatch, idMovie, userId),
    unregisterListeners: ( idMovie, userId ) => unregisterListeners(dispatch, idMovie, userId),
    changeMovieRating: throttle((...args) => changeMovieRating(...args), 3000),
    rateMovie: throttle((...args) => rateMovie(...args), 3000)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieDetailsDescription);
