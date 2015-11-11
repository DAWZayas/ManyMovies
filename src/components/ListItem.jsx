import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class ListItem extends Component {
  render() {
    const { list } = this.props;
    return (
      <Link to={`/lists/${list.slug}`}>{list.title}</Link>
    );
  }
}

ListItem.propTypes = {
  list: PropTypes.object
};

ListItem.defaultProps = {
  list: {}
};
