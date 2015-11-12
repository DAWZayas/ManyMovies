import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import Lists from '../components/Lists';

function mapStateToProps(state) {
  return {
    lists: state.lists
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handler: path => dispatch(pushState(null, path))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lists);
