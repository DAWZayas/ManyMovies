import React, { Component, PropTypes } from 'react';
import UiListItem from 'material-ui/lib/lists/list-item';

export default class ListItem extends Component {
  handleTouchStart(list) {
    const { handler } = this.props;
    const slug = list.slug;
    return function(){
      return handler('/lists/' + slug);
    };
  }

  render() {
    const { list } = this.props;
    const title = list.title;
    return (
        <UiListItem primaryText={title} onClick={this.handleTouchStart(list)} onTouchStart={this.handleTouchStart(list)}/>
    );
  }
}

ListItem.propTypes = {
  list: PropTypes.object,
  handler : PropTypes.func
};

ListItem.defaultProps = {
  list: {}
};
