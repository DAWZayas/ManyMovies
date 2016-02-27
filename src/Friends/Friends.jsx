import React, { Component, PropTypes } from 'react';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import FontIcon from 'material-ui/lib/font-icon';
import Color from 'material-ui/lib/styles/colors';
import FollowList from './FollowList';
import CircularProgress from 'material-ui/lib/circular-progress';
import TextField from 'material-ui/lib/text-field';
import { debounce } from 'lodash';
import { userUid } from '../utils';

export default class Friends extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount(){
    const { auth, registerListeners } = this.props;
    registerListeners(userUid(auth.uid));
  }

  componentWillUnmount(){
    const { auth, unregisterListeners } = this.props;
    unregisterListeners(userUid(auth.uid));
  }

  _handleSearchChange(){
    const { searchPeople } = this.props;
    const searchTerm = this.refs.search.getValue();
    searchPeople(searchTerm);
  }

  render() {
    const styles = {
      label: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
      icon: { color: 'white', marginRight: '0.5em' },
      miniSpinner: { textAlign: 'center' },
      inkBar: { backgroundColor: Color.deepOrange800, height:"0.3em", marginTop: "-0.3em" },
      tabs: { marginTop: '2em' },
      tab: { backgroundColor: Color.orange600 }
    };

    const miniSpinner = (
      <div style={styles.miniSpinner}>
        <CircularProgress color={Color.deepOrangeA200} />
      </div>);

    const { followers, following, watchedPeople } = this.props;
    return(
      <Tabs style={styles.tabs} inkBarStyle={styles.inkBar}>
        <Tab
          style={styles.tab}
          label={
            <div style={styles.label}>
              <FontIcon className="material-icons" style={styles.icon}>people</FontIcon>
              <span> Following </span>
            </div>
          }
        >
          {
            following.loading ?
              miniSpinner :
              <FollowList users={following.users}/>
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
            followers.loading ?
              miniSpinner :
              <FollowList users={followers.users}/>
          }
        </Tab>
        <Tab
          style={styles.tab}
          label={
            <div style={styles.label}>
              <FontIcon className="material-icons" style={styles.icon}>search</FontIcon>
              <span> Search people </span>
            </div>
          }
        >
          <div style={{display: "flex", justifyContent: "center", padding: "1em"}}>
            <FontIcon style={{lineHeight: "2em"}} className="material-icons">search</FontIcon>
            <TextField
              ref="search"
              style={{flexGrow: "20"}}
              hintText="Look for people"
              onChange={debounce(this._handleSearchChange.bind(this), 300)}
            />
          </div>
          <FollowList users={watchedPeople}/>
        </Tab>
    </Tabs>
    );
  }
}

Friends.propTypes = {
  followers: PropTypes.object,
  following: PropTypes.object,
  searchPeople: PropTypes.func,
  watchedPeople: PropTypes.array,
  registerListeners: PropTypes.func,
  unregisterListeners: PropTypes.func,
  auth: PropTypes.object
};
