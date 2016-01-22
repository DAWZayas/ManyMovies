import React, { Component, PropTypes } from 'react';
import NewsItem from '../NewsItem';
import Spinner from '../../Widgets/Spinner';

export default class News extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentWillMount() {
    this.props.registerListeners();
  }

  componentWillReceiveProps() {
    this.setState({ loading: false });
  }

  componentWillUnmount() {
    this.props.unregisterListeners();
  }

  render() {
    const { posts, navigate } = this.props;
    const { loading } = this.state;
    return !loading ? (
      <div>
        {
          posts.map( post => <NewsItem key={post.id} newItem={post} navigate={navigate}/>)
        }
      </div>
    ) : (
      <Spinner/>
    );
  }
}

News.propTypes = {
  posts: PropTypes.array,
  navigate: PropTypes.func,
  registerListeners: PropTypes.func.isRequired,
  unregisterListeners: PropTypes.func.isRequired
};

News.defaultProps = {
  posts: []
};
