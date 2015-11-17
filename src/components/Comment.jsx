import React, { Component, PropTypes } from 'react';
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import CardHeader from 'material-ui/lib/card/card-header';
import CardActions from 'material-ui/lib/card/card-actions';
import TextField from 'material-ui/lib/text-field';
import Avatar from 'material-ui/lib/avatar';
import FontIcon from 'material-ui/lib/font-icon';
import IconButton from 'material-ui/lib/icon-button';
import Colors from 'material-ui/lib/styles/colors';
import { formatDate } from '../utils/date';
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();


export default class Comment extends Component {

  constructor(props) {
    super(props);
    const { comment } = props;
    this.state = { editing: false, comment };
  }

  componentDidUpdate() {
    if (this.refs.comment) {
      this.refs.comment.focus();
      this.refs.comment._getInputNode().select();
    }
  }

  _handleTouchEdit() {
    this.setState({editing: true});
  }

  _handleTouchEditSubmit() {
    this._stopEditing();
  }

  _handleTouchEditCancel() {
    this._stopEditing();
  }

  _handleKeyDown(e){
    // Ctrl + Enter
    if (e.ctrlKey && e.keyCode === 13){
      this._stopEditing();
    // ESC key
    }else if (e.keyCode === 27){
      this._stopEditing();
    }
  }

  _stopEditing() {
    this.setState({editing: false});
  }


  render() {
    const { time, text, modified } = this.state.comment;
    const userAvatar = (
      <Avatar
        icon={
          <FontIcon
            className="material-icons">
              face
          </FontIcon>
        }
        color={Colors.orange100}
        backgroundColor={Colors.deepOrange900}
      />
    );

    const modifiedTime = modified ? <div><small>Edited on {formatDate(modified)}</small></div> : '';
    const cardBody = this.state.editing ? (
      <CardText>
        <TextField
          onKeyDown={this._handleKeyDown.bind(this)}
          ref="comment"
          floatingLabelText="Comment"
          defaultValue={text}
          multiLine
          fullWidth
          rows={4}
        />
      </CardText>
      ) : (
      <CardText>
        {text}
        {modifiedTime}
      </CardText>
    );

    const cardActions = this.state.editing ? (
      <CardActions style={{float: "right"}}>
          <IconButton
            iconClassName="material-icons"
            iconStyle={{color:Colors.green500}}
            tooltipPosition="top-left"
            tooltip="Edit"
            onTouchTap={this._handleTouchEditSubmit.bind(this)}>
            done
          </IconButton>
          <IconButton
            iconClassName="material-icons"
            iconStyle={{color:Colors.red900}}
            tooltipPosition="top-left"
            tooltip="Cancel"
            onTouchTap={this._handleTouchEditCancel.bind(this)}>
            clear
          </IconButton>
        </CardActions>
      ) : (
      <CardActions style={{float: "right"}}>
          <IconButton
            iconClassName="material-icons"
            iconStyle={{color:Colors.grey400}}
            tooltipPosition="top-left"
            tooltip="Edit"
            onTouchTap={this._handleTouchEdit.bind(this)}>
            edit
          </IconButton>
          <IconButton
            iconClassName="material-icons"
            iconStyle={{color:Colors.red900}}
            tooltipPosition="top-left"
            tooltip="Delete">
            clear
          </IconButton>
        </CardActions>
    );

    return (
      <Card>
        <CardHeader
          title="You"
          titleColor={Colors.deepOrange900}
          titleStyle={{fontWeight: "bold"}}
          subtitle={formatDate(time)}
          avatar={userAvatar}
        />
        {cardBody}
        {cardActions}
      </Card>
    );
  }
}

Comment.propTypes = {
  commented: PropTypes.string,
  comment: PropTypes.object
};

Comment.defaultProps = {
  comment:{
    text: 'This movie is awesome',
    time: new Date(),
    modified: new Date()
  }
};
