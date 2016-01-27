import { connect } from 'react-redux';
import { editUser } from '../actions';
import Profile from './Profile';

function mapStateToProps(state) {
  return {
    auth: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    editUser: (user, newStats) => dispatch(editUser(user, newStats)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
