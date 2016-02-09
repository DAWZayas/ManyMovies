import React, { Component, PropTypes } from 'react';
import Avatar from 'material-ui/lib/avatar';
import RaisedButton from 'material-ui/lib/raised-button';
import { isEqual } from 'lodash';
import Spinner from '../Widgets/Spinner';
import Friends from '../Friends/Friends';
import EditProfile from './EditProfile';

export default class Profile extends Component {
  constructor(props) {
    super(props);
      this.state = {
        loading: true,
        editing: false
      };
  }

  componentWillMount() {
    this.props.registerListeners();
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      loading: false,
      name: newProps.user.displayName,
      avatar: newProps.user.avatarUrl
    });
    if (!isEqual(this.props.user, newProps.user) && this.refs.snack){
      this.refs.snack.show();
    }
  }

  componentWillUnmount() {
    this.props.unregisterListeners();
  }

  _handleTouchTap(){
    this.setState({editing: true});
  }

  stopEditing(){
  this.setState({editing: false});
  }

  render() {
    const { loading, editing} = this.state;
    const { editProfile, user } = this.props;
    const edit = !editing ?
          <div>
            <h2>{this.state.name}</h2>
            <RaisedButton label="Edit" onTouchTap={this._handleTouchTap.bind(this)}/>
          </div>
        : <EditProfile editProfile={editProfile} user={user} stopEditing={this.stopEditing.bind(this)}/>;
    return !loading ? (
      <div style={{textAlign: "center", padding:"1em 0 0 0"}}>
        <Avatar
          size={200}
          src={this.state.avatar}
        />
        { edit }
        <Friends user={user}/>
      </div>
    ) : (
      <Spinner />
    );
  }
}

Profile.propTypes = {
  user: PropTypes.object,
  editProfile: PropTypes.func,
  registerListeners: PropTypes.func,
  unregisterListeners: PropTypes.func
};
