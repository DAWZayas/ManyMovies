import React, { Component, PropTypes } from 'react';
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import CardHeader from 'material-ui/lib/card/card-header';
import CardTitle from 'material-ui/lib/card/card-title';
import CardActions from 'material-ui/lib/card/card-actions';
import TextField from 'material-ui/lib/text-field';
import Avatar from 'material-ui/lib/avatar';
import IconButton from 'material-ui/lib/icon-button';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import Colors from 'material-ui/lib/styles/colors';
import { throttle } from 'lodash';
import { formatDate } from '../../utils/date';
import { relativeScore } from '../../utils';
import defaultAvatar from '../../../images/avatar.png';

export default class Comment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      deleting: false,
      hidingBadComment: true,
      creator: {
        displayName: "Unknown",
        userName: props.comment.userName,
        avatarUrl: defaultAvatar
      }
    };
  }

  componentWillMount(){
    this.props.registerListeners(this.props.comment.userName, this);
  }

  componentDidUpdate(){
    if (this.refs.comment) {
      this.refs.comment.focus();
      this.refs.comment._getInputNode().select();
    }
  }

  componentWillUnmount(){
    this.props.unregisterListeners(this.props.comment.userName);
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

  _handleDialogRequestClose() {
    this._stopDeleting();
  }

  _handleTouchDelete(){
    this.setState({deleting: true});
  }

  _handleDialogSubmit(){
    const { removeComment, comment, idCommented } = this.props;
    const { id } = comment;
    removeComment(id, idCommented);
    this._stopDeleting();
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

  _handleLike(){
    const { likeComment, comment, idCommented, user } = this.props;
    const { id } = comment;
    likeComment(id, idCommented, user.userName);
  }

  _handleUnlike(){
    const { unlikeComment, comment, idCommented, user } = this.props;
    const { id } = comment;
    unlikeComment(id, idCommented, user.userName);
  }

  _handleUndislikeAndLike(){
    const { undislikeAndLikeComment, comment, idCommented, user } = this.props;
    const { id } = comment;
    undislikeAndLikeComment(id, idCommented, user.userName);
  }

  _handleDislike(){
    const { dislikeComment, comment, idCommented, user } = this.props;
    const { id } = comment;
    dislikeComment(id, idCommented, user.userName);
  }

  _handleUnDislike(){
    const { undislikeComment, comment, idCommented, user } = this.props;
    const { id } = comment;
    undislikeComment(id, idCommented, user.userName);
  }

  _handleUnlikeAndDislike(){
    const { unlikeAndDislikeComment, comment, idCommented, user } = this.props;
    const { id } = comment;
    unlikeAndDislikeComment(id, idCommented, user.userName);
  }

  _handleShowHidden(){
    this.setState({ hidingBadComment: false});
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

  _stopDeleting() {
    this.setState({deleting: false});
  }

  _isCommentedByMe(){
    return this.props.user.userName === this.state.creator.userName;
  }

  _getCardActions(){
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
    return cardActions;
  }

  _getDeleteDialog(){
    const dialogActions = [
      <FlatButton
      key={0}
        label="Cancel"
        secondary
        onTouchTap={this._handleDialogRequestClose.bind(this)}
      />,
      <FlatButton
        key={1}
        label="Delete"
        primary
        onTouchTap={this._handleDialogSubmit.bind(this)}
      />
    ];

    const dialog = (
      <Dialog
        actions={dialogActions}
        actionFocus="submit"
        open={this.state.deleting}
        onRequestClose={this._handleDialogRequestClose.bind(this)}>
        Are you sure you want to remove the comment?
      </Dialog>);

    return dialog;
  }

  _getLikeIcon(){
    const { isLiked, isDisliked } = this.props;
    const buttonAction = isLiked ? this._handleUnlike.bind(this) :
                         isDisliked ? this._handleUndislikeAndLike.bind(this) :
                         this._handleLike.bind(this);

    const likeClass = isLiked ? "fa fa-thumbs-up" : "fa fa-thumbs-o-up";
    const icon = (<IconButton
            iconClassName={likeClass}
            iconStyle={{color:Colors.green900}}
            onTouchTap={throttle(buttonAction, 10000)}/>);
    return icon;
  }

  _getDislikeIcon(){
    const { isLiked, isDisliked } = this.props;
    const buttonAction = isDisliked ? this._handleUnDislike.bind(this) :
                         isLiked ? this._handleUnlikeAndDislike.bind(this) :
                         this._handleDislike.bind(this);

    const likeClass = isDisliked ? "fa fa-thumbs-down" : "fa fa-thumbs-o-down";
    const icon = (<IconButton
            iconClassName={likeClass}
            iconStyle={{color:Colors.red900}}
            onTouchTap={throttle(buttonAction, 10000)}/>);
    return icon;
  }

  _getScoreColor(score){
    if (score < 0){
      return { color: Colors.red900 };
    }
    if (score > 0){
      return { color: Colors.green500 };
    }
    return {};
  }

  render() {
    const { time, text, modified, likes, dislikes } = this.props.comment;
    const formatedText = text.split(/\r?\n/);
    const score = likes - dislikes;
    const isBadComment = relativeScore(dislikes, likes + dislikes) > 0.4 ? true : false;
    const userAvatar = (
      <Avatar
        src={this.state.creator.avatarUrl}
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
        <div>
        {
          formatedText.map( (text, index ) => <p key={index}>{text}</p> )
        }
        </div>
        {modifiedTime}
      </CardText>
    );

    const showBadCommentBody = (
      <CardText style={{textAlign: 'center'}}>
        Comment hidden due to bad ratings,
        <span
          style={{fontWeight: 'bold', cursor: 'pointer'}}
          onClick={() => this._handleShowHidden()}
          > show </span>
        under your responsibility
      </CardText>
    );
    const filteredBody = (this.state.hidingBadComment && isBadComment) ?
      <span>{showBadCommentBody}</span> :
      <span>{cardBody}</span>;

    const cardHeader = (
      <CardHeader
        style={{backgroundColor: Colors.grey300}}
        title={<span>Commented by <span style={{color: Colors.deepOrange900, fontWeight: "bolder"}}>{this.state.creator.displayName}</span></span>}
        subtitle={formatDate(time)}
        subtitleStyle={{color: Colors.grey700}}
        avatar={userAvatar}
      />
    );

    const scoreColor = this._getScoreColor(score);

    const cardLikes = (
      <CardTitle
        style={{paddingBottom: '3em'}}
        subtitle={
          <span>
            {this._getLikeIcon()}
            <span style={Object.assign({}, {display: 'inline-block', width: '3em', textAlign: 'center'}, scoreColor)}>{(score <= 0 ? '' : '+') + score}</span>
            {this._getDislikeIcon()}
          </span>
        }
        subtitleStyle={{float: 'right'}}
      />
    );

    const cardActions = this._isCommentedByMe.bind(this)() ? this._getCardActions.bind(this)() : '';
    const dialog = this._isCommentedByMe.bind(this)() ? this._getDeleteDialog.bind(this)() : '';

    return (
      <Card style={{margin: "1em 0 0 0", backgroundColor: Colors.grey200}}>
        {cardHeader}
        {cardLikes}
        {filteredBody}
        {cardActions}
        {dialog}
      </Card>
    );
  }
}

Comment.propTypes = {
  registerListeners: PropTypes.func,
  unregisterListeners: PropTypes.func,
  user: PropTypes.object,
  comment: PropTypes.object,
  editComment: PropTypes.func,
  removeComment: PropTypes.func,
  likeComment: PropTypes.func,
  unlikeComment: PropTypes.func,
  undislikeAndLikeComment: PropTypes.func,
  dislikeComment: PropTypes.func,
  undislikeComment: PropTypes.func,
  unlikeAndDislikeComment: PropTypes.func,
  idCommented: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  isLiked: PropTypes.bool,
  isDisliked: PropTypes.bool
};
