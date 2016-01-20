import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { registerListeners, unregisterListeners } from './listeners';
import News from './News';

function mapStateToProps(state) {
  const { posts } = state;
  return {
    posts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    navigate: path => dispatch(pushState(null, path)),
    registerListeners: () => registerListeners(dispatch),
    unregisterListeners: () => unregisterListeners(dispatch)
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(News);
