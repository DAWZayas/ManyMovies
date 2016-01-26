import { connect } from 'react-redux';
import ListsDetails from './ListDetails';
import { registerListeners, unregisterListeners } from './listeners';
import { editListAndNavigate, deleteListAndNavigate } from './side-actions';
import { addEntry, removeEntry } from '../side-actions';
import { pushState } from 'redux-router';

function mapStateToProps(state) {
  return {
    list: state.watchedList,
    user: state.users.Gotre,
    movies: state.watchedEntries
  };
}

function mapDispatchToProps(dispatch) {
  return {
    navigate: path => dispatch(pushState(null, path)),
    addEntry: (idCollection, idEntry, idUser) => addEntry(idCollection, idEntry, idUser),
    removeEntry : (idCollection, idEntry, idUser) => removeEntry(idCollection, idEntry, idUser),
    editListAndNavigate: (user, id, title, desc) => editListAndNavigate(user, id, title, desc, dispatch),
    deleteListAndNavigate: (user, id) => deleteListAndNavigate(user, id, dispatch),
    registerListeners: params => registerListeners(dispatch, params),
    unregisterListeners: (params, listId) => unregisterListeners(dispatch, params, listId)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListsDetails);
