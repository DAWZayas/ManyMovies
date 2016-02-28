import React, { Component, PropTypes } from 'react';
import Avatar from 'material-ui/lib/avatar';
import RaisedButton from 'material-ui/lib/raised-button';
import Color from 'material-ui/lib/styles/colors';
import { isEqual, isEmpty } from 'lodash';
import Friends from '../Friends';
import CardTitle from 'material-ui/lib/card/card-title';
import Card from 'material-ui/lib/card/card';
import TextField from 'material-ui/lib/text-field';
import IconButton from 'material-ui/lib/icon-button';
import Snackbar from 'material-ui/lib/snackbar';
import Spinner from '../Widgets/Spinner';
import { allTrim } from '../utils';

export default class Profile extends Component {
  constructor(props) {
    super(props);
      this.state = {
        editing: false,
        name: props.user.displayName,
        avatar: props.user.avatarUrl
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

  _handleEditButtonTouchTap(){
    this.setState({editing: true});
  }

  _handleFileButtonTouchTap(){
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
      this.props.editProfile(displayName, this.state.avatar);
      this.stopEditing();
    }
  }

  _handleRequestCancelSettings(){
    this.stopEditing();
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

  stopEditing(){
    this.setState({editing: false});
  }

  render() {
    const { editing } = this.state;
    const { user } = this.props;
    const snack = (<Snackbar
      action="X"
      onActionTouchTap={() => {this.refs.snack.dismiss();}}
      ref="snack"
      message="Settings were saved correctly"
      autoHideDuration={2000}
    />);
    const content = !editing ?
          <div>
            <CardTitle title={this.state.name}/>
            <RaisedButton label="Edit" onTouchTap={this._handleEditButtonTouchTap.bind(this)}/>
          </div>
        : <div style={{textAlign: "center", padding:"1em"}}>
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
            onTouchTap={this._handleFileButtonTouchTap.bind(this)}
            >
              attach_file
          </IconButton>
        </div>
        <RaisedButton
          backgroundColor={Color.green600}
          onTouchTap={this._handleRequestSaveSettings.bind(this)}
          style={{marginRight: '1em'}}
          primary
          label="Save"/>
        <RaisedButton
          backgroundColor={Color.red600}
          onTouchTap={this._handleRequestCancelSettings.bind(this)}
          primary
          label="Cancel"/>
      </div>;
    return isEmpty(user) ?
    <Spinner /> :
    (
      <div>
      <Card style={{textAlign: "center", padding:"1em", margin: "1em"}}>
        <Avatar
          size={200}
          src={this.state.avatar}
        />
        { content }
        { snack }
      </Card>
      <Friends />
      </div>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.object,
  editProfile: PropTypes.func
};
