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

  componentWillUpdate(){
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
    const { post } = this.props;
    return (
      <Card style={{ maxWidth:'900px', margin: '1em auto' }}>
        <CardMedia overlay={<CardTitle title={post.title} />}>
          <img src={post.image}/>
        </CardMedia>
        <CardText>
          {post.summary}
        </CardText>
        {
          post.entries.map((entry, index) => <CardText key={index}>{entry}</CardText>)
        }
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
    );
  }
}

NewsDetails.propTypes = {
  post: PropTypes.object,
  navigate: PropTypes.func,
};

NewsDetails.defaultProps = {

};
