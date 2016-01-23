import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { registerListeners, unregisterListeners } from './listeners';
import Lists from './Lists';

function mapStateToProps(state) {
  const { lists } = state;
  return {
    lists
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
)(Lists);
