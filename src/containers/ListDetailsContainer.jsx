import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { editList } from '../actions';
import _ from 'lodash';

import ListDetails from '../components/ListDetails';
import EntryList from '../components/EntryList';

class ListDetailsContainer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { list, editList } = this.props;
    return (
      <div>
        <ListDetails list={list} editList={editList} />
        <EntryList />
      </div>
    );
  }
}

ListDetailsContainer.propTypes = {
  list: PropTypes.object,
  editList: PropTypes.func,
  entries: PropTypes.array
};

ListDetailsContainer.defaultProps = {
  list: {},
  entries: []
};


function mapStateToProps(state) {
  const slug = state.router.params.listsSlug;
  const allEntries = state.entries;
  const { lists } = state;
  const id = _.findKey(lists, { slug });
  const list = lists[id];
  const entries = allEntries[id];
  return { list, entries };
}

function mapDispatchToProps(dispatch) {
  return {
    handler: path => dispatch(pushState(null, path)),
    editList: (id, title, desc) => dispatch(editList(id, title, desc))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListDetailsContainer);
