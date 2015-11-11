import React, { Component, PropTypes } from 'react';

export default class ListItem extends Component {
  render() {
    return (
      <div>{this.props.list}</div>
    );
  }
}

ListItem.propTypes = {
  item: PropTypes.object,
  list: PropTypes.string
};

ListItem.defaultProps = {
  item: {},
  list: ''
};
