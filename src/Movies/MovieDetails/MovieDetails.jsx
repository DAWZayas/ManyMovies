import React, { Component, PropTypes } from 'react';
import MovieDetailsDescription from './MovieDetailsDescription';
import ListsManager from './ListsManager';
import ScrollTop from '../../Widgets/ScrollTop';
import Spinner from '../../Widgets/Spinner';
import CommentsManager from '../../Comments';

export default class MovieDetails extends Component {

  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  componentWillMount() {
    this.props.registerListeners(this.props.params);
  }

  componentWillReceiveProps() {
    this.setState({ loading: false });
  }

  componentWillUnmount() {
    this.props.unregisterListeners(this.props.params);
  }

  render() {
    const { movie } = this.props;
    const { loading } = this.state;
    const idCommented = !loading ? movie.ids.trakt : null;
    return !loading ? (
      <div>
        <MovieDetailsDescription movie={movie} idMovie={idCommented}/>
        <ListsManager movie={movie} idMovie={idCommented}/>
        <CommentsManager idCommented={idCommented}/>
        <ScrollTop />
      </div>
    ) : (
      <Spinner />
    );
  }
}

MovieDetails.propTypes = {
  movie: PropTypes.object,
  idCommented: PropTypes.string,
  registerListeners: PropTypes.func,
  unregisterListeners: PropTypes.func,
  params: PropTypes.object
};

MovieDetails.defaultProps = {
};
