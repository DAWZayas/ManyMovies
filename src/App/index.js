import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import App from './App';
import { logOut } from '../Login/side-actions';

const mapStateToProps = (state) => (state.auth);

function mapDispatchToProps(dispatch) {
  return {
    navigate: path => dispatch(pushState(null, path)),
    logOut: () => logOut(dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
