import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { createList } from '../actions';
import Lists from '../components/Lists';
import _ from 'lodash';

function mapStateToProps(state) {
  const lists = _.values(state.lists);
  const customLists = lists.filter(list => list.custom);
  return {
    lists: customLists
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handler: path => dispatch(pushState(null, path)),
    createList: (title, desc) => dispatch(createList(title, desc))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lists);
