import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import UserInfo from './UserInfo';
import { followUser, unfollowUser } from './side-actions';
import { registerListeners, unregisterListeners } from './listeners';

function mapStateToProps(state) {
	const { watchedUser, user, lists, following, watchedUserFollowers, watchedUserFollowing, auth } = state;
  return {
		watchedUser, user, lists, watchedUserFollowers, watchedUserFollowing, following, auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
		navigate: path => dispatch(pushState(null, path)),
		registerListeners: (params, auth) => registerListeners(dispatch, params, auth),
    unregisterListeners: (params, auth) => unregisterListeners(dispatch, params, auth),
    followUser: (ownId, userId) => followUser(ownId, userId),
    unfollowUser: (ownId, userId) => unfollowUser(ownId, userId)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInfo);
