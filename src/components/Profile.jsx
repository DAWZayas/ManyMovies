import React, { Component, PropTypes } from 'react';
import Color from 'material-ui/lib/styles/colors';
import TextField from 'material-ui/lib/text-field';
import IconButton from 'material-ui/lib/icon-button';
import Avatar from 'material-ui/lib/avatar';
import RaisedButton from 'material-ui/lib/raised-button';
import defaultAvatar from '../../images/avatar.png';
import { allTrim } from '../utils';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {avatarUri: defaultAvatar, displayName: props.user.displayName};
  }

  _handleTouchTap(){
    this.refs.avatar.click();
  }

  _handleRequestSaveSettings(){
    const displayNameNode = this.refs.displayName;
    const displayName = allTrim(displayNameNode.getValue());
    if (!displayName){
      displayNameNode.setErrorText('You can\'t display an empty name');
      displayNameNode.focus();
      displayNameNode.clearValue();
    }else {
      //Here we call the action edit user passed as props via redux connect
    }
  }

  _handleFileChange(){
    const fileName = this.refs.avatar.value.split(/(\\|\/)/g).pop();
    this.refs.fileName.setValue(fileName);
    const reader = new FileReader();
    const file = this.refs.avatar.files[0];
    reader.onload = (upload) => {
      this.setState({
        avatarUri: upload.target.result
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    return (
      <div style={{textAlign: "center", padding:"1em 0 0 0"}}>
        <Avatar
          size={200}
          src={this.state.avatarUri}
        />
        <TextField
          ref="displayName"
          hintText="Display name"
          defaultValue={this.props.user.displayName}
          floatingLabelText="Display name"
          fullWidth
        />
        <div style={{display: "flex"}}>
          <TextField
            ref="fileName"
            style={{flexGrow: 100}}
            hintText="Choose an avatar"
            underlineDisabledStyle={{borderStyle: "solid", borderWidth: "1px", borderColor: Color.grey300}}
            disabled
            />
          <div style={{width: "0", overflow: "hidden"}}>
            <input
              onChange={this._handleFileChange.bind(this)}
              ref="avatar"
              type="file"
              accept=".png"/>
          </div>
          <IconButton
            style={{flexGrow: 1}}
            iconClassName="material-icons"
            onTouchTap={this._handleTouchTap.bind(this)}
            >
              attach_file
          </IconButton>
        </div>
        <RaisedButton
          backgroundColor={Color.green500}
          onTouchTap={this._handleRequestSaveSettings.bind(this)}
          primary
          label="Save settings"/>
      </div>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.object,
  editUser: PropTypes.func
};

Profile.defaultProps = {
  user:{
    userName: 'Gotre1',
    displayName: 'Gotrecillo',
    avatarUrl: 'http://www.icare3d.org/images/AvatarTransp.png'
  }
};
