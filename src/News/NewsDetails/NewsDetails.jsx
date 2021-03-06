import React, { Component, PropTypes } from 'react';
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import CardTitle from 'material-ui/lib/card/card-title';
import CardMedia from 'material-ui/lib/card/card-media';
import RaisedButton from 'material-ui/lib/raised-button';
import Colors from 'material-ui/lib/styles/colors';
import FontIcon from 'material-ui/lib/font-icon';
import ScrollTop from '../../Widgets/ScrollTop';
import CommentsManager from '../../Comments';
import { isEmpty } from 'lodash';
import placeholder from '../../../images/mm-fanart.png';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Spinner from '../../Widgets/Spinner';
import ShareIcon from '../../Widgets/ShareIcon';

const styles = {
  twitterContainer: { textAlign: 'center' },
  button: { margin: '1em' },
  card: { maxWidth:'900px', margin: '1em auto' },
  title: { fontWeight: 'bold', textAlign: 'center', fontSize: '1.5em' },
  summary: { fontStyle: 'italic', textAlign: 'center' },
  buttonsContainer: { display: 'flex', justifyContent: 'center'}
};

export default class NewsDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      image: undefined,
      loading: true
    };
  }

  componentWillMount() {
    this.props.registerListeners(this.props.params);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      image: nextProps.post.image,
      loading: false
    });
  }

  componentDidUpdate(prevProps){
    const { params, registerListeners, unregisterListeners } = this.props;
    if (prevProps.params.newsSlug !== params.newsSlug) {
      unregisterListeners(prevProps.params, prevProps.post.id);
      registerListeners(params);
    }
  }

  componentWillUnmount() {
    const { params, post, unregisterListeners } = this.props;
    unregisterListeners(params, post.id);
  }

  _handleTouchTap(slug){
    const { navigate } = this.props;
    setTimeout(() => {
      navigate(`/news/${slug}`);
    }, 200);
  }

  _getNavigteButton(slug, icon){
    if (!slug){
      return <span key={0}/>;
    }
    return (
      <RaisedButton key={slug} backgroundColor={Colors.deepOrangeA200} style={styles.button} onClick={this._handleTouchTap.bind(this, slug)}>
        <FontIcon color={Colors.white} className="material-icons">{icon}</FontIcon>
      </RaisedButton>
    );
  }

  render() {
    const { post } = this.props;
    const { loading } = this.state;
    const image  = this.state.image ? this.state.image : placeholder;
    const idCommented = post.id;
    const buttons = [
      {slug: post.prevSlug, icon: 'navigate_before'},
      {slug: post.nextSlug, icon: 'navigate_next'}
    ];

    return !loading && !isEmpty(post) ? (
      <ReactCSSTransitionGroup
        transitionAppear
        transitionName="news"
        transitionAppearTimeout={800}
        transitionEnterTimeout={800}
        transitionLeaveTimeout={300}>
        <Card key={post.slug} style={styles.card}>
          <CardMedia overlay={
            <CardTitle titleStyle={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
              }}
              title={post.title} />}>
              <img src={image}/>
          </CardMedia>
          <CardText style={styles.title}>
            {post.title}
          </CardText>
          <CardText style={styles.summary}>
            {post.summary}
          </CardText>
          {
            post.entries.map((entry, index) => <CardText style={{textAlign: 'justify'}} key={index}>{entry}</CardText>)
          }
          <div style={styles.twitterContainer}>
            <ShareIcon text="Check this post" />
          </div>
          <CardText style={styles.buttonsContainer}>
          {
            buttons.map(button => this._getNavigteButton(button.slug, button.icon))
          }
          </CardText>
        </Card>
        <CommentsManager idCommented={idCommented}/>
        <ScrollTop/>
      </ReactCSSTransitionGroup>
    ) : (
      <Spinner/>
    );
  }
}

NewsDetails.propTypes = {
  post: PropTypes.object,
  navigate: PropTypes.func,
  idCommented: PropTypes.string,
  params: PropTypes.object,
  registerListeners: PropTypes.func,
  unregisterListeners: PropTypes.func
};

NewsDetails.defaultProps = {

};
