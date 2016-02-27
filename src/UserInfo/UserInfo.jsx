import React, { Component, PropTypes } from 'react';
import Avatar from 'material-ui/lib/avatar';
import FlatButton from 'material-ui/lib/flat-button';
///import Color from 'material-ui/lib/styles/colors';
//import IconButton from 'material-ui/lib/icon-button';
import Spinner from '../Widgets/Spinner';
//import { isEmpty } from 'lodash';
import CardTitle from 'material-ui/lib/card/card-title';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import RaisedButton from 'material-ui/lib/raised-button';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import FontIcon from 'material-ui/lib/font-icon';
import Color from 'material-ui/lib/styles/colors';
import Dialog from 'material-ui/lib/dialog';
import TextField from 'material-ui/lib/text-field';
import List from 'material-ui/lib/lists/list';
import ListItem from '../Lists/ListItem';

export default class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      editing: false
    };
  }

  componentWillMount() {
    this.props.registerListeners(this.props.params);
  }

  componentWillReceiveProps() {
    this.setState({ loading: false });
  }

  componentWillUnmount() {
    this.props.unregisterListeners(this.props.params);
  }

  _handleButtonTouchTap() {
    this.setState({editing: !this.state.editing});
  }

  _handleRequestClose() {
    this.setState({editing: false});
  }

  _handleRequestSubmit() {
    const { watchedUser, sendMessage, user } = this.props;
    const textNode = this.refs.textMessage;
    const text = textNode.getValue();
    const watchedUserId = watchedUser.userName;
    const ownUserId = user.userName;
    sendMessage(ownUserId, text, watchedUserId, this._submitCallback.bind(this));
    this.setState({editing: false});
  }

  _submitCallback() {
    console.log(this.props);
  }

  render() {
    const { watchedUser, lists, navigate } = this.props;

    const styles = {
     label: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
     icon: { color: 'white', marginRight: '0.5em' },
     inkBar: { backgroundColor: Color.deepOrange800, height:"0.3em", marginTop: "-0.3em" },
     tabs: { marginTop: '2em' },
     tab: { backgroundColor: Color.orange600 }
    };

    const avatar = (
            <Avatar
              size={200}
              src={watchedUser.avatarUrl}
            />
          );

    const dialogActions = [
        <FlatButton
          key={0}
          label="Cancel"
          primary
          onTouchTap={this._handleRequestClose.bind(this)}
        />,
        <FlatButton
          key={1}
          label="Send"
          secondary
          onTouchTap={this._handleRequestSubmit.bind(this)}
        />
      ];

    const modalMessage = (<Dialog
          title="Message"
          actions={dialogActions}
          actionFocus="submit"
          open={this.state.editing}
          onRequestClose={this._handleRequestClose.bind(this)}
          >
          <TextField
            style={{border: `1px solid ${Color.cyan500}`}}
            underlineStyle={{borderColor: Color.cyan500}}
            underlineFocusStyle={{borderColor: Color.cyan500}}
            ref="textMessage"
            multiLine
            fullWidth
            rows={5}
          />
        </Dialog>);

    return this.state.loading ?
      <Spinner/>
      : (
          <Card style={{textAlign: "center", padding:"1em 0 0 0"}}>
            {avatar}
            <CardTitle
              title={watchedUser.displayName}
            />
            <CardActions>
              <RaisedButton label="Message" onTouchTap={() => this.setState({editing: true})}/>
              <RaisedButton label="Follow"/>
            </CardActions>
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
            />
              <Tab
               style={styles.tab}
               label={
                <div style={styles.label}>
                  <FontIcon className="material-icons" style={styles.icon}>people_outline</FontIcon>
                  <span> Followers </span>
                </div>
              }
            />
          </Tabs>
          { modalMessage }
      </Card>
    );
  }
}

UserInfo.propTypes = {
  user: PropTypes.object,
  watchedUser: PropTypes.object,
  registerListeners: PropTypes.func,
  unregisterListeners: PropTypes.func,
  params: PropTypes.object,
  sendMessage: PropTypes.func,
  lists: PropTypes.array,
  navigate: PropTypes.func
};

