import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import NewsDetails from '../components/NewsDetails';
import _ from 'lodash';

function mapStateToProps(state) {
  const slug = state.router.params.newsSlug;
  const { posts } = state;
  const post = _.filter(posts, 'slug', slug)[0];
  const { id } = post;
  const comments = state.comments[id] || [];
  return {
    post,
    idCommented: id,
    comments
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
)(NewsDetails);
