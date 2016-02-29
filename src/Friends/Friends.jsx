import React, { Component, PropTypes } from 'react';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import FontIcon from 'material-ui/lib/font-icon';
import Color from 'material-ui/lib/styles/colors';
import CircularProgress from 'material-ui/lib/circular-progress';
import FollowList from './FollowList';
import TextField from 'material-ui/lib/text-field';
import { debounce } from 'lodash';
import { userUid } from '../utils';
import { createUsersTab } from '../utils/constructors';

const styles = {
  label: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
  icon: { color: 'white', marginRight: '0.5em' },
  miniSpinner: { textAlign: 'center', marginBottom: '1em' },
  inkBar: { backgroundColor: Color.deepOrange800, height:'0.3em', marginTop: '-0.3em' },
  tabs: { marginTop: '2em' },
  tab: { backgroundColor: Color.orange600 },
  container: { display: 'flex', justifyContent: 'center', padding: '1em' },
  fontIcon: { lineHeight: '2em' },
  input: { flexGrow: '20' }
};

export default class Friends extends Component {

  constructor(props) {
    super(props);
    this.state = { searching: false };
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
    this.setState({ searching: true });
    searchPeople(searchTerm, this._searchCallback.bind(this));
  }

  _searchCallback(){
    this.setState({ searching: false });
  }

  render() {
    const { followers, following, watchedPeople } = this.props;
    return(
      <Tabs style={styles.tabs} inkBarStyle={styles.inkBar}>
        { createUsersTab(following, 'people', 'Following' )}
        { createUsersTab(followers, 'people_outline', 'Followers' )}
        <Tab
          style={styles.tab}
          label={
            <div style={styles.label}>
              <FontIcon className="material-icons" style={styles.icon}>search</FontIcon>
              <span> Search people </span>
            </div>
          }
        >
          <div style={styles.container}>
            <FontIcon style={styles.fontIcon} className="material-icons">search</FontIcon>
            <TextField
              ref="search"
              style={styles.input}
              hintText="Look for people"
              onChange={debounce(this._handleSearchChange.bind(this), 300)}
            />
          </div>
          <FollowList users={watchedPeople}/>
          <div style={styles.container}>
            { this.state.searching ? <CircularProgress color={Color.deepOrange800} /> : <span/> }
          </div>
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
