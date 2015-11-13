import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import MovieDetails from '../components/MovieDetails';
import _ from 'lodash';

function mapStateToProps(state) {
  const movie = _.values(state.movie);
    return {
    movie: movie
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handler: path => dispatch(pushState(null, path)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieDetails);
