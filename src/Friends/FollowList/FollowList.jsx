import React, { Component, PropTypes } from 'react';
import Avatar from 'material-ui/lib/avatar';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

export default class FollowList extends Component {

  constructor(props) {
    super(props);
  }

  _handleTouchTap(userName) {
    const { navigate } = this.props;
    navigate(`/userinfo/${userName}`);
  }

  render () {
    const { users } = this.props;
    return (
        <List>
          {
            users.map(user => <ListItem
              key={user.userName}
              primaryText={user.displayName}
              leftAvatar={<Avatar src={user.avatarUrl} />}
              onTouchTap={this._handleTouchTap.bind(this, user.userName)}
            /> )
          }
        </List>
    );
  }
}

FollowList.propTypes = {
  users: PropTypes.array,
  navigate: PropTypes.func
};
