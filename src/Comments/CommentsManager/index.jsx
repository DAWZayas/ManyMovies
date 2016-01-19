import { connect } from 'react-redux';
import { registerListeners, unregisterListeners } from './listeners';
import CommentsManager from './CommentsManager';


function mapStateToProps(state) {
  const { comments, users } = state;
  return {
    comments,
    user: users.Gotre
  };
}

function mapDispatchToProps(dispatch) {
  return {
    registerListeners: (userId, idCommented) => registerListeners(dispatch, userId, idCommented),
    unregisterListeners: (userId, idCommented) => unregisterListeners(dispatch, userId, idCommented)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentsManager);
