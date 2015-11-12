import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import ListDetails from '../components/ListDetails';
import EntryList from '../components/EntryList';

class ListDetailsContainer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { list } = this.props;
    return (
      <div>
        <ListDetails list={list} />
        <EntryList />
      </div>
    );
  }
}

ListDetailsContainer.propTypes = {
  list: PropTypes.object,
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

export default connect(
  mapStateToProps
)(ListDetailsContainer);
