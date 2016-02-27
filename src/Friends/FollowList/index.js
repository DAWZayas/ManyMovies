import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import FollowList from './FollowList';

const mapStateToProps = () => ({});

function mapDispatchToProps(dispatch) {
  return {
    navigate: path => dispatch(pushState(null, path))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FollowList);
