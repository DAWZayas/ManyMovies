import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import Movies from '../components/Movies';

function mapStateToProps(state) {
  const { movies } = state;
  return {
    movies
  };
}

function mapDispatchToProps(dispatch) {
  return {
    navigate: path => dispatch(pushState(null, path)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Movies);
