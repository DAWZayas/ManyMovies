import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { editListAndNavigate } from '../actions';
import _ from 'lodash';

import ListDetailsHead from '../components/ListDetailsHead';
import EntryList from '../components/EntryList';

class ListDetailsContainer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { lists, list, editListAndNavigate, entries } = this.props;
    return (
      <div>
        <ListDetailsHead lists={lists} list={list} editListAndNavigate={editListAndNavigate} />
        <EntryList entries={entries} />
      </div>
    );
  }
}

ListDetailsContainer.propTypes = {
  lists: PropTypes.object,
  list: PropTypes.object,
  editListAndNavigate: PropTypes.func,
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
  return { lists, list, entries };
}

function mapDispatchToProps(dispatch) {
  return {
    handler: path => dispatch(pushState(null, path)),
    editListAndNavigate: (id, title, desc, slug) => dispatch(editListAndNavigate(id, title, desc, slug))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListDetailsContainer);
