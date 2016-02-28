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
import { throttle, isEmpty } from 'lodash';
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
    const { registerListeners, comment } = this.props;
    registerListeners(comment.userName, this._listenerCallback.bind(this));
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

  _handleShowHidden(){
    this.setState({ hidingBadComment: false});
  }

  _handleCommentVote(callback){
    return () => {
      const { comment, idCommented, user } = this.props;
      callback(comment.id, idCommented, user.userName);
    };
  }

  _handleCreatorTouchTap(user){
    const { navigate } = this.props;
    navigate(`/userinfo/${user}`);
  }

  _listenerCallback(creator){
    this.setState({creator});
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

  _getVoteIcon(active, oppositeActive, thumb, callbacks, color){
    const { user } = this.props;
    if (isEmpty(user)){
      return <span/>;
    }

    const handleInactive = this._handleCommentVote(callbacks.inactive);
    const handleActive = this._handleCommentVote(callbacks.active);
    const handleInactiveAndOppositeActive = this._handleCommentVote(callbacks.inactiveAndOppositeActive);

    const buttonAction = active ? handleActive.bind(this) :
                         oppositeActive ? handleInactiveAndOppositeActive.bind(this) :
                         handleInactive.bind(this);

    const iconClass = active ? `fa fa-thumbs-${thumb}` : `fa fa-thumbs-o-${thumb}`;
    const icon = (<IconButton
            iconClassName={iconClass}
            iconStyle={{ color }}
            onTouchTap={throttle(buttonAction, 10000)}/>);
    return icon;
  }

  _getScoreColor(score){
    return score > 0 ?
            { color: Colors.green500 } :
           score === 0 ?
            {} :
            { color: Colors.red900 };
  }

  render() {
    const { time, text, modified, likes, dislikes } = this.props.comment;
    const {
      likeComment,
      unlikeComment,
      undislikeAndLikeComment,
      dislikeComment,
      undislikeComment,
      unlikeAndDislikeComment,
      isLiked,
      isDisliked
    } = this.props;

    const likeCallbacks = { active: unlikeComment, inactive: likeComment, inactiveAndOppositeActive: undislikeAndLikeComment };
    const dislikeCallbacks = { active: undislikeComment, inactive: dislikeComment, inactiveAndOppositeActive: unlikeAndDislikeComment };

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
        title={<span>Commented by <span onTouchTap={this._handleCreatorTouchTap.bind(this, this.state.creator.userName)} style={{cursor: 'pointer', color: Colors.deepOrange900, fontWeight: "bolder"}}>{this.state.creator.displayName}</span></span>}
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
            {this._getVoteIcon.bind(this)(isLiked, isDisliked, 'up', likeCallbacks, Colors.green900)}
            <span style={Object.assign({}, {display: 'inline-block', width: '3em', textAlign: 'center'}, scoreColor)}>{(score <= 0 ? '' : '+') + score}</span>
            {this._getVoteIcon.bind(this)(isDisliked, isLiked, 'down', dislikeCallbacks, Colors.red900)}
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
  navigate: PropTypes.func,
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
