import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { registerListeners, unregisterListeners } from './listeners';
import NewsDetails from './NewsDetails';

function mapStateToProps(state) {
  const { watchedPost } = state;
  return {
    post: watchedPost
  };
}

function mapDispatchToProps(dispatch) {
  return {
    navigate: path => dispatch(pushState(null, path)),
    registerListeners: params => registerListeners(dispatch, params),
    unregisterListeners: (params, idImage) => unregisterListeners(dispatch, params, idImage)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsDetails);
