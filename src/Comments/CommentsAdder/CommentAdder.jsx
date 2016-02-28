import React, { Component, PropTypes } from 'react';
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import CardHeader from 'material-ui/lib/card/card-header';
import CardActions from 'material-ui/lib/card/card-actions';
import TextField from 'material-ui/lib/text-field';
import Avatar from 'material-ui/lib/avatar';
import Colors from 'material-ui/lib/styles/colors';
import { allTrim } from '../../utils';
import { createIconButton } from '../../utils/constructors';
import { isEmpty } from 'lodash';

const styles = {
  body: { backgroundColor: Colors.grey200 },
  actions: { float: 'right' },
  greenColor: { color:Colors.green500 },
  redColor: { color:Colors.red900 },
  card: { margin: '0 0 1em 0', backgroundColor: Colors.grey200 },
  cardText: { fontSize: '1.5em', backgroundColor: Colors.white },
  cardHeader: { backgroundColor: Colors.grey300 },
  author: {color: Colors.deepOrange900, fontWeight: 'bold'}
};

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
      <CardText style={styles.body}>
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
        <CardActions style={styles.actions}>
          { createIconButton(styles.greenColor, this._handleCommentTap.bind(this), 'Comment', 'done')}
          { createIconButton(styles.redColor, this._handleCancelTap.bind(this), 'Cancel', 'clear')}
        </CardActions>
      ) : '';

    return isEmpty(user) ?
      <span/>
     :
     (
      <Card style={styles.card}>
        <CardText style={styles.cardText}><b>Post</b> a new comment</CardText>
        <CardHeader
          style={styles.cardHeader}
          title={<span>Commenting as <span style={styles.author}>{user.displayName}</span></span>}
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
