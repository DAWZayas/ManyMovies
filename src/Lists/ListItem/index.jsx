import React, { Component, PropTypes } from 'react';
import Color from 'material-ui/lib/styles/colors';
import UiListItem from 'material-ui/lib/lists/list-item';
import Avatar from 'material-ui/lib/avatar';

export default class ListItem extends Component {
  handleTouchTap() {
    const { navigate, user, list } = this.props;
    const slug = list.slug;
    navigate(`/lists/${user.userName}/${slug}`);
  }

  render() {
    const { list } = this.props;
    const title = list.title;
    const firstLetter = title[0];
    return (
        <UiListItem
          primaryText={title}
          leftAvatar={<Avatar>{firstLetter}</Avatar>}
          secondaryText={`${list.desc}`}
          style={{color: Color.deepOrange500}}
          onTouchTap={this.handleTouchTap.bind(this)}
        />
    );
  }
}

ListItem.propTypes = {
  list: PropTypes.object,
  navigate : PropTypes.func,
  user: PropTypes.object
};

ListItem.defaultProps = {
  list: {}
};
