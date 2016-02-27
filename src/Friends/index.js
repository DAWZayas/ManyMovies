import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { searchPeople } from './side-actions';
import { registerListeners, unregisterListeners } from './listeners';
import Friends from './Friends';

const mapStateToProps = state => {
  const { user, followers, following, auth, watchedPeople } = state;
  return {
    user, followers, following, auth, watchedPeople
  };
};

function mapDispatchToProps(dispatch) {
  return {
		navigate: path => dispatch(pushState(null, path)),
    searchPeople: term => searchPeople(term, dispatch),
    registerListeners: id  => registerListeners(dispatch, id),
    unregisterListeners: id => unregisterListeners(dispatch, id)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Friends);
