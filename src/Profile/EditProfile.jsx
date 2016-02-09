import React, { Component, PropTypes } from 'react';
import Color from 'material-ui/lib/styles/colors';
import TextField from 'material-ui/lib/text-field';
import IconButton from 'material-ui/lib/icon-button';
import RaisedButton from 'material-ui/lib/raised-button';
import Snackbar from 'material-ui/lib/snackbar';
import { allTrim } from '../utils';
import { isEqual } from 'lodash';
//import Friends from '../Friends/Friends';

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
      this.state = {
        loading: true,
        name: this.props.user.displayName,
        avatar: this.props.user.avatarUrl
      };
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
      displayNameNode.setValue(displayName);
      this.props.editProfile(displayName, this.state.avatar, this.props.stopEditing());
    }
  }

  _handleFileChange(){
    const fileName = this.refs.avatar.value.split(/(\\|\/)/g).pop();
    this.refs.fileName.setValue(fileName);
    const reader = new FileReader();
    const file = this.refs.avatar.files[0];
    reader.onload = (e) => {
      this.setState({
        avatar: e.target.result
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    const snack = (<Snackbar
      action="X"
      onActionTouchTap={() => {this.refs.snack.dismiss();}}
      ref="snack"
      message="Settings were saved correctly"
      autoHideDuration={2000}
    />);

    return (
      <div style={{textAlign: "center", padding:"1em 0 0 0"}}>
        {snack}
        <TextField
          ref="displayName"
          hintText="Display name"
          defaultValue={this.state.name}
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
          <input
            style={{display: "none"}}
            onChange={this._handleFileChange.bind(this)}
            ref="avatar"
            type="file"
            accept=".png"/>
          <IconButton
            style={{flexGrow: 1}}
            iconClassName="material-icons"
            onTouchTap={this._handleTouchTap.bind(this)}
            >
              attach_file
          </IconButton>
        </div>
        <RaisedButton
          backgroundColor={Color.orange600}
          onTouchTap={this._handleRequestSaveSettings.bind(this)}
          primary
          label="Save settings"/>
      </div>
    );
  }
}

EditProfile.propTypes = {
  user: PropTypes.object,
  editProfile: PropTypes.func,
  stopEditing: PropTypes.func
};
