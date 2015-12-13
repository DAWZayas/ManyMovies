import React, { Component, PropTypes } from 'react';
import { getDocHeight } from '../utils';
import $ from 'jquery';
import Colors from 'material-ui/lib/styles/colors';
import CircularProgress from 'material-ui/lib/circular-progress';
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import Comment from '../components/Comment';
import CommentAdder from '../components/CommentAdder';

const PAGE_SIZE = 5;

export default class CommentsManager extends Component {

  constructor(props) {
    super(props);
    this.state = {
      maxComments: PAGE_SIZE,
      loadMoreHandler: this._loadMoreOnBottom.bind(this),
      loading: false
    };
  }

  componentDidMount(){
    window.addEventListener("scroll", this.state.loadMoreHandler);
  }

  componentWillUnmount(){
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
      <div>
        <CommentAdder idCommented={idCommented}/>
        {comments.slice(0, maxComments).map((comment, index) => (<Comment key={index} idCommented={idCommented} comment={comment}/>))}
        {progress}
      </div>
    );
  }
}

CommentsManager.propTypes = {
  idCommented: PropTypes.string,
  comments: PropTypes.array
};

CommentsManager.defaultProps = {
};