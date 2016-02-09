import React, { Component, PropTypes } from 'react';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import FontIcon from 'material-ui/lib/font-icon';
import Color from 'material-ui/lib/styles/colors';
import FollowList from './FollowList/FollowList';

export default class Friends extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { user } = this.props;

    return(
      <Tabs style={{ marginTop: '2em'}} inkBarStyle={{backgroundColor: Color.orange600}}>
        <Tab
          label={
            <div>
              <FontIcon className="material-icons" style={{color: 'white'}}>people</FontIcon>
              <span> Following </span>
            </div>
          }
        >
          <FollowList rightIcon={<i className="material-icons">remove_circle</i>} user={user}/>
        </Tab>
        <Tab
          label={
            <div>
              <FontIcon className="material-icons" style={{color: 'white'}}>people_outline</FontIcon>
              <span> Followers </span>
            </div>
          }
        >
          <FollowList rightIcon={<i className="material-icons">add_circle</i>} user={user}/>
        </Tab>
        <Tab
          label={
            <div>
              <FontIcon className="material-icons" style={{color: 'white'}}>search</FontIcon>
              <span> Search people </span>
            </div>
          }
        />
    </Tabs>
    );
  }
}

Friends.propTypes = {
  user: PropTypes.object
};
/*
firebase.child(users).on....

friends/userId/objeto cn sus amigos
*/
