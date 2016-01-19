import { connect } from 'react-redux';
import Comment from './Comment';
import { removeComment, editComment, likeComment, unlikeComment, dislikeComment, undislikeComment, unlikeAndDislikeComment, undislikeAndLikeComment } from './side-actions.js';

function mapStateToProps(state, ownProp) {
  const user = state.users.Gotre;
  const isLiked = Object.keys(state.userLikes).indexOf(ownProp.comment.id) !== -1;
  const isDisliked = Object.keys(state.userDislikes).indexOf(ownProp.comment.id) !== -1;
  return { creator: state.users[ownProp.comment.userName], user, isLiked, isDisliked };
}

function mapDispatchToProps() {
  return {
    removeComment: (id, idCommented) => removeComment(id, idCommented),
    editComment: (id, idCommented, text) => editComment(id, idCommented, text),
    likeComment: (id, idCommented, userId) => likeComment(id, idCommented, userId),
    unlikeComment: (id, idCommented, userId) => unlikeComment(id, idCommented, userId),
    dislikeComment: (id, idCommented, userId) => dislikeComment(id, idCommented, userId),
    undislikeComment: (id, idCommented, userId) => undislikeComment(id, idCommented, userId),
    unlikeAndDislikeComment: (id, idCommented, userId) => unlikeAndDislikeComment(id, idCommented, userId),
    undislikeAndLikeComment: (id, idCommented, userId) => undislikeAndLikeComment(id, idCommented, userId)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment);