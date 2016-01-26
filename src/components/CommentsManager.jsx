import React, { Component, PropTypes } from 'react';
import { getDocHeight } from '../utils';
import { connect } from 'react-redux';
import { setUserLikes, setUserDislikes, setComments } from '../actions';
import firebase from '../utils/firebase';
import $ from 'jquery';
import Colors from 'material-ui/lib/styles/colors';
import CircularProgress from 'material-ui/lib/circular-progress';
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import Comment from '../components/Comment';
import CommentAdder from '../components/CommentAdder';
import { values } from 'lodash';

const PAGE_SIZE = 5;

class CommentsManager extends Component {

  constructor(props) {
    super(props);
    this.state = {
      maxComments: PAGE_SIZE,
      loadMoreHandler: this._loadMoreOnBottom.bind(this),
      loading: false
    };
  }

  componentWillMount(){
    const { registerListeners, user, idCommented } = this.props;
    registerListeners(user.userName, idCommented);
  }

  componentDidMount(){
    window.addEventListener("scroll", this.state.loadMoreHandler);
  }

  componentWillUnmount(){
    const { unregisterListeners, user, idCommented } = this.props;
    unregisterListeners(user.userName, idCommented);
    window.removeEventListener("scroll", this.state.loadMoreHandler);
  }

  _loadMoreOnBottom() {
    if (this.state.maxComments >= this.props.comments.length){
      return;
    }
    if ($(window).scrollTop() + $(window).height() > getDocHeight() - 15) {
      $('body').css('cursor', 'progress');
      setTimeout(() => {
         this.setState({loading: true});
        }
        , 0);
      setTimeout(() => {
        $('body').css('cursor', 'initial');
        this.setState({maxComments: this.state.maxComments + PAGE_SIZE, loading: false});
      }, 3000);
    }
  }

  render() {
    const {
      comments, idCommented
    } = this.props;
    const { maxComments } = this.state;
    const progress = this.state.loading ?
    <Card style={{margin: "1em 0 0 0", backgroundColor: Colors.grey200}}>
      <CardText style={{textAlign: 'center'}}>
        <CircularProgress
          mode="indeterminate"
          color={Colors.deepOrange900}
        />
      </CardText>
    </Card>
    : null;

    return (
      <div style={{margin: '0 0 10em'}}>
        <CommentAdder idCommented={idCommented}/>
        {comments.slice(0, maxComments).map((comment, index) => (<Comment key={index} idCommented={idCommented} comment={comment}/>))}
        {progress}
      </div>
    );
  }
}

CommentsManager.propTypes = {
  idCommented: PropTypes.string,
  user: PropTypes.object,
  registerListeners: PropTypes.func,
  unregisterListeners: PropTypes.func,
  comments: PropTypes.array
};

CommentsManager.defaultProps = {
};


function mapStateToProps(state) {
  const { comments, users } = state;
  return {
    comments,
    user: users.Gotre
  };
}

function mapDispatchToProps(dispatch) {
  return {
    registerListeners: (userId, idCommented) => registerListeners(dispatch, userId, idCommented),
    unregisterListeners: (userId, idCommented) => unregisterListeners(dispatch, userId, idCommented)
  };
}

function registerListeners(dispatch, userId, idCommented) {
  const commentsRef = firebase.child(`comments/${idCommented}`);
  const likesRef = firebase.child(`userLikes/${userId}/${idCommented}`);
  const dislikesRef = firebase.child(`userDislikes/${userId}/${idCommented}`);
  likesRef.on('value', snapshot => dispatch(setUserLikes(snapshot.val())));
  dislikesRef.on('value', snapshot => dispatch(setUserDislikes(snapshot.val())));
  commentsRef.orderByChild('time').on('value', snapshot => {
    const val = snapshot.val();
    const comments = val !== null ? val : [];
    return dispatch(setComments(values(comments).reverse()));
  });
}

function unregisterListeners(dispatch, userId, idCommented) {
  const commentsRef = firebase.child(`comments/${idCommented}`);
  const likesRef = firebase.child(`userLikes/${userId}/${idCommented}`);
  const dislikesRef = firebase.child(`userDislikes/${userId}/${idCommented}`);
  likesRef.off();
  dislikesRef.off();
  commentsRef.off();
  dispatch(setUserLikes([]));
  dispatch(setUserDislikes([]));
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentsManager);
