import React, { Component, PropTypes } from 'react';

export default class ListItem extends Component {
  render() {
    console.log('---------', this.props);
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
