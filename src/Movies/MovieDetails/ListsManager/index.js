import { connect } from 'react-redux';
import { addEntry, removeEntry } from './side-actions.js';
import { registerListeners, unregisterListeners } from './listeners';
import ListsManager from './ListsManager';

function mapStateToProps(state) {
  const { lists, entries, users } = state;
  return {
    lists,
    entries,
    user: users.Gotre
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addEntry: (idCollection, id, userId) => addEntry(idCollection, id, userId),
    removeEntry: (idCollection, id, userId) => removeEntry(idCollection, id, userId),
    registerListeners: userId => registerListeners(dispatch, userId),
    unregisterListeners: userId => unregisterListeners(dispatch, userId)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListsManager);
