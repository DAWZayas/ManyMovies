import React, { Component, PropTypes } from 'react';
import ListItem from 'material-ui/lib/lists/list-item';

export default class ListDetails extends Component {
  render() {
    const { list } = this.props;
    const title = list.title;
    return (
      <ListItem primaryText={title}/>
    );
  }
}

ListDetails.propTypes = {
  list: PropTypes.object
};

ListDetails.defaultProps = {
  list: {}
};
