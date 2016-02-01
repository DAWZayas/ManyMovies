import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { editProfile } from '../Login/actions/side-actions';
import Profile from './Profile';

function mapStateToProps(state) {
  return {
    auth: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
		navigate: path => dispatch(pushState(null, path)),
    editProfile: (authData, displayName) => editProfile(authData, displayName, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
