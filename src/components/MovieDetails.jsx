import React, { Component, PropTypes } from 'react';
import MovieDetailsDescription from './MovieDetailsDescription';
import ListsManager from './ListsManager';
import ScrollTop from './ScrollTop';
import CommentsManager from './CommentsManager';
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

export default class MovieDetails extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { movie, idCommented, comments } = this.props;
    return (
      <div>
        <MovieDetailsDescription movie={movie}/>
        <ListsManager movie={movie}/>
        <CommentsManager idCommented={idCommented} comments={comments} />
        <ScrollTop />
      </div>
    );
  }
}

MovieDetails.propTypes = {
  movie: PropTypes.object,
  idCommented: PropTypes.string,
  comments: PropTypes.array
};

MovieDetails.defaultProps = {
};
