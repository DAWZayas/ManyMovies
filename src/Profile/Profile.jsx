import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/lib/text-field';
//import IconButton from 'material-ui/lib/icon-button';
import Avatar from 'material-ui/lib/avatar';
import { allTrim } from '../utils';
import Badge from 'material-ui/lib/badge';
import Color from 'material-ui/lib/styles/colors';
import NotificationsIcon from 'material-ui/lib/svg-icons/social/notifications';
//import GridList from 'material-ui/lib/grid-list/grid-list';
//import GridTile from 'material-ui/lib/grid-list/grid-tile';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.auth[this.props.auth.provider].displayName,
      avatar: this.props.auth[this.props.auth.provider].profileImageURL
      };
  }

    _handleRequestSaveSettings(){
    const displayNameNode = this.refs.displayName;
    const displayName = allTrim(displayNameNode.getValue());
    if (!displayName){
      displayNameNode.setErrorText('You can\'t display an empty name');
      displayNameNode.focus();
      displayNameNode.clearValue();
    }else {
      this.props.editUser(this.props.auth, {displayName, avatar: this.state.avatar});
      displayNameNode.setValue(displayName);
      this.refs.snack.show();
    }
  }

    _handleTouchTap(){
    this.refs.avatar.click();
  }
  _handleFileChange(){
    const fileName = this.refs.avatar.value.split(/(\\|\/)/g).pop();
    this.refs.fileName.setValue(fileName);
    const reader = new FileReader();
    const file = this.refs.avatar.files[0];
    reader.onload = (e) => {
      this.setState({
        avatarUri: e.target.result
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    return(
      <div style={{textAlign: "center", padding:"1em 0 0 0"}}>

        <Avatar size={200} src={this.state.avatar}/>
        <TextField underlineStyle={{borderColor: Color.orange600, fontSize: "40px"}} disabled />
        <h2> {this.state.name} </h2>
        <Badge badgeContent={10}
               secondary
               badgeStyle={{left: 27, backgroundColor: Color.orange600}}>
          <NotificationsIcon/>
        </Badge>
      </div>
    );
  }
}

Profile.propTypes = {
  auth: PropTypes.object,
  users: PropTypes.object,
  editUser: PropTypes.func
};

/*
    const tilesData = [
      {
        img: this.state.avatar,
        title: 'Koalita'
      },
      {
        img: this.state.avatar,
        title: 'Tasty burger'
      },
      {
        img: this.state.avatar,
        title: 'Camera'
      }
    ];


        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
        }}>
          <GridList
            cellHeight={200}
            style={{
          width: 500,
          height: 400,
          overflowY: 'auto',
          marginBottom: 21,
        }}
          >
          {tilesData.map(tile => (
            <GridTile
              key={tile.img}
              title={tile.title}
            >
              <img src={tile.img} />
            </GridTile>
          ))}
          </GridList>
        </div>
        */
