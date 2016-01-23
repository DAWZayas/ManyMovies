import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import ListDetails from './ListDetails';
import { registerListeners, unregisterListeners } from './listeners';
import _ from 'lodash';
import { editListAndNavigate, deleteListAndNavigate } from './side-actions';

function mapStateToProps(state) {
  const slug = state.router.params.listsSlug;
  const { lists } = state;
  const id = _.findKey(lists, { slug });
  const list = lists[id];
  //const movies = _getMoviesInList(state, id);
  //const comments = _getCommentsInList(state, id);
  return { lists, list };
}

function mapDispatchToProps(dispatch) {
  return {
    navigate: path => dispatch(pushState(null, path)),
    editListAndNavigate: (id, title, desc, slug) => dispatch(editListAndNavigate(id, title, desc, slug)),
    deleteListAndNavigate: (id, user = 'Gotre') => deleteListAndNavigate(id, user, dispatch),
    //removeEntry: (idCollection, id) => dispatch(removeEntry(idCollection, id)),
    //addEntry: (idCollection, id) => dispatch(addEntry(idCollection, id)),
    registerListeners: params => registerListeners(dispatch, params),
    unregisterListeners: params => unregisterListeners(params)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListDetails);
