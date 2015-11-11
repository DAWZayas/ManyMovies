import { connect } from 'react-redux';
import Lists from '../components/Lists';
import { createList, deleteList, editList } from '../actions';
// import _ from 'lodash';

function mapStateToProps(state) {
  return {
    all: state,
    lists: { 1:'1', 2:'2', 3:'3', 4:'4' }
  };
}

function mapActionsToProps(dispatch) {
  return {
    onCreateList: (title, desc) => dispatch(createList(title, desc)),
    onDeleteList: (id) => dispatch(deleteList(id)),
    onEditList: (id, options) => dispatch(editList(id, options))
  };
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Lists);
