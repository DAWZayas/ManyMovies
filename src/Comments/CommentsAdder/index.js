import { connect } from 'react-redux';
import { createComment } from './side-actions.js';
import CommentAdder from './CommentAdder';

function mapStateToProps(state) {
  const  { user } = state;
  return { user };
}

function mapDispatchToProps() {
  return {
    createComment: (idCommented, text, userName) => createComment(idCommented, text, userName)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentAdder);

