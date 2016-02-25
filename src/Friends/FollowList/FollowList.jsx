import React, { Component, PropTypes } from 'react';
import Avatar from 'material-ui/lib/avatar';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

export default class FollowList extends Component {

  constructor(props) {
    super(props);
  }
  render () {
    const { rightIcon, user } = this.props;
    return (
        <List>
          <ListItem
            primaryText={user.displayName}
            leftAvatar={<Avatar src={user.avatarUrl} />}
            rightIcon={rightIcon}
          />
        </List>
    );
  }
}

FollowList.propTypes = {
  rightIcon: PropTypes.object,
  user: PropTypes.object
};
