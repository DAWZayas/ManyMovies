import React, { Component, PropTypes } from 'react';
import UiListItem from 'material-ui/lib/lists/list-item';
import Avatar from 'material-ui/lib/avatar';

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
    const firstLetter = title[0];
    return (
        <UiListItem
          primaryText={title}
          leftAvatar={<Avatar>{firstLetter}</Avatar>}
          secondaryText="by you"
          style={{color:"red"}}
          onClick={this.handleTouchStart(list)}
          onTouchStart={this.handleTouchStart(list)}/>
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
