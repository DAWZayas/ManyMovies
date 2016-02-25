import { connect } from 'react-redux';
import { addEntry, removeEntry } from '../../../Lists/side-actions.js';
import { registerListeners, unregisterListeners } from './listeners';
import ListsManager from './ListsManager';

function mapStateToProps(state) {
  const { lists, entries, user } = state;
  return {
    lists,
    entries,
    user
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
