import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { logOut } from '../Login/side-actions';
import { registerListeners, unregisterListeners } from  './listeners';
import App from './App';

const mapStateToProps = state => ({auth: state.auth, user: state.user});

function mapDispatchToProps(dispatch) {
  return {
    navigate: path => dispatch(pushState(null, path)),
    logOut: () => logOut(dispatch),
    registerListeners: id => registerListeners(id, dispatch),
    unregisterListeners: id => unregisterListeners(id, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
