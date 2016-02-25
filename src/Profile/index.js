import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { editProfile } from './side-actions';
import Profile from './Profile';

function mapStateToProps(state) {
	const { user } = state;
  return {
		user
  };
}

function mapDispatchToProps(dispatch) {
  return {
		navigate: path => dispatch(pushState(null, path)),
    editProfile: (displayName, avatar) => editProfile(displayName, avatar)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
