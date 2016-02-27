import { connect } from 'react-redux';
import { pushState } from 'redux-router';
//import { sendMessage, follow, unFollow } from './side-actions';
import UserInfo from './UserInfo';
import { registerListeners, unregisterListeners } from './listeners';
import { sendMessage } from './side-actions';

function mapStateToProps(state) {
	const { watchedUser, user, lists } = state;
  return {
		watchedUser, user, lists
  };
}

function mapDispatchToProps(dispatch) {
  return {
		navigate: path => dispatch(pushState(null, path)),
		registerListeners: params => registerListeners(dispatch, params),
    unregisterListeners: params => unregisterListeners(dispatch, params),
    sendMessage: (userName, message, userId, callback) => sendMessage(userName, message, userId, callback)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInfo);
