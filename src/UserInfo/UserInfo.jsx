import React, { Component, PropTypes } from 'react';
import Avatar from 'material-ui/lib/avatar';
import Spinner from '../Widgets/Spinner';
import { isEmpty } from 'lodash';
import CardTitle from 'material-ui/lib/card/card-title';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import RaisedButton from 'material-ui/lib/raised-button';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import FontIcon from 'material-ui/lib/font-icon';
import Color from 'material-ui/lib/styles/colors';
import List from 'material-ui/lib/lists/list';
import FollowList from '../Friends/FollowList';
import CircularProgress from 'material-ui/lib/circular-progress';
import ListItem from '../Lists/ListItem';
import { find } from 'lodash';

export default class UserInfo extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { registerListeners, params, auth } = this.props;
    registerListeners(params, auth);
  }

  componentDidUpdate(prevProps){
    const { registerListeners, unregisterListeners, params } = this.props;
    if (prevProps.params.idUser !== params.idUser) {
      unregisterListeners(prevProps.params);
      registerListeners(params);
    }
  }

  componentWillUnmount() {
    const { unregisterListeners, params, auth } = this.props;
    unregisterListeners(params, auth);
  }

  _handleUnfollow() {
    const { unfollowUser, watchedUser, user } = this.props;
    unfollowUser(user.userName, watchedUser.userName);
  }

  _handleFollow() {
    const { followUser, watchedUser, user } = this.props;
    followUser(user.userName, watchedUser.userName);
  }

  render() {
    const { watchedUser, lists, navigate, auth, following, watchedUserFollowers, watchedUserFollowing } = this.props;
    const styles = {
     label: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
     icon: { color: 'white', marginRight: '0.5em' },
     inkBar: { backgroundColor: Color.deepOrange800, height:"0.3em", marginTop: "-0.3em" },
     tabs: { marginTop: '2em' },
     tab: { backgroundColor: Color.orange600},
     miniSpinner: { textAlign: 'center', marginBottom: '1em'},
    };

    const avatar = (
            <Avatar
              size={200}
              src={watchedUser.avatarUrl}
            />
          );

    const miniSpinner = (
      <div style={styles.miniSpinner}>
        <CircularProgress color={Color.deepOrangeA200} />
      </div>);

    return isEmpty(watchedUser) || isEmpty(lists) ?
      <Spinner/>
      : (<div>
          <Card style={{textAlign: "center", padding:"1em", margin: "1em"}}>
            {avatar}
            <CardTitle
              title={watchedUser.displayName}
            />
            <CardActions>
              {
                isEmpty(auth) ?
                  null :
                  following.loading ?
                    null :
                    find(following.users, { 'userName': watchedUser.userName }) ?
                    <RaisedButton label="Unfollow" onTouchTap={this._handleUnfollow.bind(this)}/> :
                    <RaisedButton label="Follow" onTouchTap={this._handleFollow.bind(this)}/>
              }
            </CardActions>
          </Card>
          <Tabs style={styles.tabs} inkBarStyle={styles.inkBar}>
            <Tab
             style={styles.tab}
             label={
              <div style={styles.label}>
                <FontIcon className="material-icons" style={styles.icon}>playlist_play</FontIcon>
                <span style={styles.icon}> Lists </span>
                <span> {lists.length} </span>
              </div>
              }
            >
              <List>
                {
                 lists.map((list, index) =>  (<ListItem
                   key={index}
                   list={list}
                   navigate={navigate}
                   user={watchedUser}/>)
                   )
                }
              </List>
            </Tab>
            <Tab
             style={styles.tab}
             label={
              <div style={styles.label}>
                <FontIcon className="material-icons" style={styles.icon}>people</FontIcon>
                <span> Following </span> <br/>
              </div>
              }
            >
            {
              watchedUserFollowers.loading ?
                miniSpinner :
                <FollowList users={watchedUserFollowing.users}/>
            }
            </Tab>
            <Tab
             style={styles.tab}
             label={
              <div style={styles.label}>
                <FontIcon className="material-icons" style={styles.icon}>people_outline</FontIcon>
                <span> Followers </span>
              </div>
              }
            >
            {
              watchedUserFollowers.loading ?
                miniSpinner :
                <FollowList users={watchedUserFollowers.users}/>
            }
            </Tab>
          </Tabs>
        </div>
    );
  }
}

UserInfo.propTypes = {
  user: PropTypes.object,
  auth: PropTypes.object,
  watchedUser: PropTypes.object,
  watchedUserFollowers: PropTypes.object,
  watchedUserFollowing: PropTypes.object,
  registerListeners: PropTypes.func,
  unregisterListeners: PropTypes.func,
  followUser: PropTypes.func,
  unfollowUser: PropTypes.func,
  params: PropTypes.object,
  lists: PropTypes.array,
  navigate: PropTypes.func,
  following: PropTypes.object
};

