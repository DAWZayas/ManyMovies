import React, { Component, PropTypes } from 'react';
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import CardTitle from 'material-ui/lib/card/card-title';
import CardMedia from 'material-ui/lib/card/card-media';
import RaisedButton from 'material-ui/lib/raised-button';
import Colors from 'material-ui/lib/styles/colors';
import FontIcon from 'material-ui/lib/font-icon';
import $ from 'jquery';
import ScrollTop from './ScrollTop';
import CommentsManager from './CommentsManager';
import twitter from '../../images/twitter.png';
import { getDayHashtag } from '../utils';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default class NewsDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount(){
    $(function() {
      $('body').scrollTop(0);
    });
  }
  componentWillUpdate(nextProps){
    if (this.props.comments.length !== nextProps.comments.length){
      return;
    }
    $(function() {
      $('body').scrollTop(0);
    });
  }

  _handleTouchTap(slug){
    const { navigate } = this.props;
    setTimeout(() => {
      navigate(`/news/${slug}`);
    }, 200);
  }

  _getPrevButton(){
    const { prevSlug } = this.props.post;
    if (!prevSlug){
      return null;
    }
    return (
      <RaisedButton backgroundColor={Colors.deepOrangeA200} style={{margin: '1em'}} onClick={this._handleTouchTap.bind(this, prevSlug)}>
        <FontIcon color={Colors.white} className="material-icons">navigate_before</FontIcon>
      </RaisedButton>
    );
  }

  _getNextButton(){
    const { nextSlug } = this.props.post;
    if (!nextSlug){
      return null;
    }
    return (
      <RaisedButton backgroundColor={Colors.deepOrangeA200} style={{margin: '1em'}} onClick={this._handleTouchTap.bind(this, nextSlug)}>
        <FontIcon color={Colors.white} className="material-icons">navigate_next</FontIcon>
      </RaisedButton>
    );
  }

  render() {
    const { post, idCommented, comments } = this.props;
    const social = (
      <div style={{textAlign: 'center'}}>
        <div style={{color: Colors.white, backgroundColor: '#53d0e8', lineHeight: "2em", display: 'inline-block', padding: '0 0.5em 0 0' }}>
          <a
            style={{color: Colors.white, textDecoration: 'none'}}
            target="_blank"
            href={`https://twitter.com/intent/tweet?text=Check this post&hashtags=${getDayHashtag()},ManyMovies&url=${window.location.href}`}>
            <img style={{height: "2em"}} src={twitter} alt="twitter-logo"/>
            Share
          </a>
        </div>
      </div>
      );
    return (
      <ReactCSSTransitionGroup
        transitionAppear
        transitionName="news"
        transitionAppearTimeout={800}
        transitionEnterTimeout={800}
        transitionLeaveTimeout={300}>
        <Card key={post.slug} style={{ maxWidth:'900px', margin: '1em auto' }}>
          <CardMedia overlay={
            <CardTitle titleStyle={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
              }}
              title={post.title} />}>
              <img src={post.image}/>
          </CardMedia>
          <CardText style={{fontWeight: 'bold', textAlign: 'center', fontSize: '1.5em'}}>
            {post.title}
          </CardText>
          <CardText style={{fontStyle: 'italic', textAlign: 'center'}}>
            {post.summary}
          </CardText>
          {
            post.entries.map((entry, index) => <CardText style={{textAlign: 'justify'}} key={index}>{entry}</CardText>)
          }
          {social}
          <CardText style={{ display: 'flex', justifyContent: 'center'}}>
            {
              this._getPrevButton.bind(this)()
            }
            {
              this._getNextButton.bind(this)()
            }
          </CardText>
          <ScrollTop/>
        </Card>
        <CommentsManager idCommented={idCommented} comments={comments} />
      </ReactCSSTransitionGroup>
    );
  }
}

NewsDetails.propTypes = {
  post: PropTypes.object,
  navigate: PropTypes.func,
  idCommented: PropTypes.string,
  comments: PropTypes.array
};

NewsDetails.defaultProps = {

};
