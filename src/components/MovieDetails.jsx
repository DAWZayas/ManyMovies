import React, { Component, PropTypes } from 'react';
import MovieDetailsDescription from './MovieDetailsDescription';
import ListsManager from './ListsManager';
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

export default class MovieDetails extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { movie } = this.props;
    return (
      <div>
        <MovieDetailsDescription movie={movie}/>
        <ListsManager movie={movie}/>
      </div>
    );
  }
}

MovieDetails.propTypes = {
  movie: PropTypes.object
};

MovieDetails.defaultProps = {
};
