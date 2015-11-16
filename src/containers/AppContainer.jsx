import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { setDefaultMovies } from '../actions';
import App from './App';

function mapDispatchToProps(dispatch) {
  return {
    handler: path => dispatch(pushState(null, path)),
    setDefaultMovies: (movies) => dispatch(setDefaultMovies(movies))
  };
}

export default connect(
  mapDispatchToProps
)(App);
