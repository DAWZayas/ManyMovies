import { connect } from 'react-redux';
import SignIn from './SignIn';
import { signInWith } from './side-actions';
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
    signInWith: provider => signInWith(provider, dispatch)
  };
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SignIn);
