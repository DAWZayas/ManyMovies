import { connect } from 'react-redux';
import SignIn from './SignIn';
import { signInWith } from './actions/side-actions';
import { registerListeners, unregisterListeners } from './listeners';
import { pushState } from 'redux-router';

function mapStateToProps(state) {
  const { authData } = state;
  return {
    user: authData
  };
}
function mapDispatchToProps(dispatch) {
  return {
		navigate: path => dispatch(pushState(null, path)),
    signInWith: provider => signInWith(provider),
    registerListeners: () => registerListeners(),
    unregisterListeners: () => unregisterListeners()
  };
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SignIn);
