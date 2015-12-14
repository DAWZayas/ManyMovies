import React, { Component, PropTypes } from 'react';
import NewsItem from './NewsItem';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default class News extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { posts, navigate } = this.props;

    return (
      <div>
        {
          posts.map( post => <NewsItem key={post.id} newItem={post} navigate={navigate}/>)
        }
      </div>
    );
  }
}

News.propTypes = {
  posts: PropTypes.array,
  navigate: PropTypes.func
};

News.defaultProps = {
  posts: []
};
