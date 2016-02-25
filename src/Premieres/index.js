import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { registerListeners, unregisterListeners } from './listeners';
import Premieres from './Premieres';

function mapStateToProps(state) {
  const { movies, user } = state;
  return {
    premieres: movies, user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    navigate: path => dispatch(pushState(null, path)),
    registerListeners: page => registerListeners(dispatch, page),
    unregisterListeners: () => unregisterListeners(dispatch)

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Premieres);
