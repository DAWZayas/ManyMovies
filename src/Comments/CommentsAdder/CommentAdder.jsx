import React, { Component, PropTypes } from 'react';
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import CardHeader from 'material-ui/lib/card/card-header';
import CardActions from 'material-ui/lib/card/card-actions';
import TextField from 'material-ui/lib/text-field';
import Avatar from 'material-ui/lib/avatar';
import IconButton from 'material-ui/lib/icon-button';
import Colors from 'material-ui/lib/styles/colors';
import { allTrim } from '../../utils';
import { isEmpty } from 'lodash';

export default class CommentAdder extends Component {

  constructor(props) {
    super(props);
    this.state = ({commenting: false});
  }

  _handleKeyDown(e){
    // Ctrl + Enter
    if (e.ctrlKey && e.keyCode === 13){
      this._submitChangesAndClear();
    // ESC key
    }else if (e.keyCode === 27){
      this._stopCommenting();
    }
  }

  _handleInputFocus(){
    this.setState({commenting: true});
  }

  _handleCommentTap(){
    this._submitChangesAndClear();
  }

  _handleCancelTap(){
    this._stopCommenting();
  }

  _stopCommenting(){
    this.setState({commenting: false});
    this._clearCommentInput();
  }

  _clearCommentInput(){
    this.refs.comment.setValue('');
    this.refs.comment.blur();
  }

  _submitChanges(){
    const { createComment, idCommented } = this.props;
    const text = this.refs.comment.getValue();
    createComment(idCommented, text, this.props.user.userName);
  }

  _submitChangesAndClear(){
    const commentNode = this.refs.comment;
    const comment = allTrim(commentNode.getValue());
    if (!comment) {
      commentNode.setErrorText('Don\'t post empty comments');
      commentNode.setValue('');
      commentNode.focus();
    }else {
      this._submitChanges();
      this._stopCommenting();
    }
  }

  render() {
    const { user } = this.props;
    const userAvatar = (
      <Avatar
        src={user.avatarUrl}
      />
    );
    const cardBody = (
      <CardText style={{backgroundColor: Colors.grey200}}>
        <TextField
          onKeyDown={this._handleKeyDown.bind(this)}
          ref="comment"
          floatingLabelText="What are you thinking"
          onFocus={this._handleInputFocus.bind(this)}
          multiLine
          fullWidth
          rows={4}
        />
      </CardText>
    );
    const cardActions = this.state.commenting ? (
        <CardActions style={{float: "right"}}>
          <IconButton
            iconClassName="material-icons"
            iconStyle={{color:Colors.green500}}
            tooltipPosition="top-left"
            tooltip="Comment"
            onTouchTap={this._handleCommentTap.bind(this)}>
            done
          </IconButton>
          <IconButton
            iconClassName="material-icons"
            iconStyle={{color:Colors.red900}}
            tooltipPosition="top-left"
            tooltip="Cancel"
            onTouchTap={this._handleCancelTap.bind(this)}>
            clear
          </IconButton>
        </CardActions>
      ) : '';

    return isEmpty(user) ?
      <span/>
     :
     (
      <Card style={{margin: "0 0 1em 0", backgroundColor: Colors.grey200}}>
        <CardText style={{fontSize: "1.5em", backgroundColor: Colors.white }}><b>Post</b> a new comment</CardText>
        <CardHeader
          style={{backgroundColor: Colors.grey300}}
          title={<span>Commenting as <span style={{color: Colors.deepOrange900, fontWeight: "bold"}}>{user.displayName}</span></span>}
          avatar={userAvatar}
        />
        {cardBody}
        {cardActions}
      </Card>
    );
  }
}

CommentAdder.propTypes = {
  createComment: PropTypes.func,
  idCommented: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  user: PropTypes.object
};

CommentAdder.defaultProps = {
};
