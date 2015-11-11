import React, { Component } from 'react';
import { connect } from 'react-redux';

import ListDetails from '../components/ListDetails';
import EntryList from '../components/EntryList';

class ListDetailsContainer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ListDetails />
        <EntryList />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(
  mapStateToProps
)(ListDetailsContainer);
