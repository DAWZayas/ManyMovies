import { connect } from 'react-redux';
import { addEntry, removeEntry } from '../../../actions';
import ListsManager from './ListsManager';

function mapStateToProps(state, ownProps) {
  const { lists, entries } = state;
  return { state, ownProps, lists, entries };
}

function mapDispatchToProps(dispatch) {
  return {
    addEntry: (idCollection, id) => dispatch(addEntry(idCollection, id)),
    removeEntry: (idCollection, id) => dispatch(removeEntry(idCollection, id))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListsManager);
