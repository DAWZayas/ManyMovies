import { connect } from 'react-redux';
import { editUser } from '../actions';
import Profile from '../components/Profile';

function mapStateToProps(state) {
  const user = state.users.Gotre;
  return {
    user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    editUser: (user, newStats) => dispatch(editUser(user, newStats))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
