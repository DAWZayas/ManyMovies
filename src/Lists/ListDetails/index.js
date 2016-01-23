import { connect } from 'react-redux';
import ListsDetails from './ListDetails';
import { registerListeners, unregisterListeners } from './listeners';
import { editListAndNavigate, deleteListAndNavigate } from './side-actions';
import _ from 'lodash';
import { pushState } from 'redux-router';

function mapStateToProps(state) {
  const slug = state.router.params.listsSlug;
  const { lists } = state;
  const id = _.findKey(lists, { slug });
  const list = lists[id];
  return { lists, list };
}

function mapDispatchToProps(dispatch) {
  return {
    navigate: path => dispatch(pushState(null, path)),
    editListAndNavigate: (user = 'Gotre1', id, title, desc, slug) => dispatch(editListAndNavigate(user, id, title, desc, slug)),
    deleteListAndNavigate: (user = 'Gotre1', id) => deleteListAndNavigate(user, id, dispatch),
    registerListeners: params => registerListeners(dispatch, params),
    unregisterListeners: params => unregisterListeners(params)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListsDetails);
