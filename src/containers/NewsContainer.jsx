import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import News from '../components/News';

function mapStateToProps(state) {
  const { posts } = state;
  return {
    posts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    navigate: path => dispatch(pushState(null, path)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(News);
