import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { removeComment, editComment } from '../actions';
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import CardHeader from 'material-ui/lib/card/card-header';
import CardActions from 'material-ui/lib/card/card-actions';
import TextField from 'material-ui/lib/text-field';
import Avatar from 'material-ui/lib/avatar';
import IconButton from 'material-ui/lib/icon-button';
import Colors from 'material-ui/lib/styles/colors';
import { formatDate } from '../utils/date';
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();


class Comment extends Component {

  constructor(props) {
    super(props);
    this.state = {editing: false};
  }

  componentDidUpdate(){
    if (this.refs.comment) {
      this.refs.comment.focus();
      this.refs.comment._getInputNode().select();
    }
  }

  _handleTouchEdit() {
    this.setState({editing: true});
  }

  _handleTouchEditSubmit() {
    this._submitChanges();
    this._stopEditing();
  }

  _handleTouchEditCancel() {
    this._stopEditing();
  }

  _handleTouchDelete(){
    const { removeComment, comment, idCommented } = this.props;
    const { id } = comment;
    removeComment(id, idCommented);
  }

  _handleKeyDown(e){
    // Ctrl + Enter
    if (e.ctrlKey && e.keyCode === 13){
      this._submitChanges();
      this._stopEditing();
    // ESC key
    }else if (e.keyCode === 27){
      this._stopEditing();
    }
  }

  _submitChanges(){
    const { editComment, comment, idCommented } = this.props;
    const { id } = comment;
    const text = this.refs.comment.getValue();
    editComment(id, idCommented, text);
  }

  _stopEditing() {
    this.setState({editing: false});
  }


  render() {
    const { time, text, modified } = this.props.comment;
    const userAvatar = (
      <Avatar
        src={this.props.creator.avatarUrl}
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
            tooltip="Delete"
            onTouchTap={this._handleTouchDelete.bind(this)}>
            clear
          </IconButton>
        </CardActions>
    );

    const userActions = this.props.user.userName === this.props.creator.userName ?
      cardActions : '';
    return (
      <Card style={{margin: "1em 0 0 0", backgroundColor: Colors.grey200}}>
        <CardHeader
          style={{backgroundColor: Colors.grey300}}
          title={<span>Commented by <span style={{color: Colors.deepOrange900, fontWeight: "bolder"}}>{this.props.creator.displayName}</span></span>}
          subtitle={formatDate(time)}
          subtitleStyle={{color: Colors.grey700}}
          avatar={userAvatar}
        />
        {cardBody}
        {userActions}
      </Card>
    );
  }
}

Comment.propTypes = {
  user: PropTypes.object,
  comment: PropTypes.object,
  creator: PropTypes.object,
  editComment: PropTypes.func,
  removeComment: PropTypes.func,
  idCommented: PropTypes.string
};

function mapStateToProps(state, ownProp) {
  const user = state.users.Gotre;
  return {creator: state.users[ownProp.comment.userName], user};
}

function mapDispatchToProps(dispatch) {
  return {
    removeComment: (id, idCommented) => dispatch(removeComment(id, idCommented)),
    editComment: (id, idCommented, text) => dispatch(editComment(id, idCommented, text))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment);
