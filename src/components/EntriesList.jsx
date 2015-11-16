import React, { Component, PropTypes } from 'react';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import injectTapEventPlugin from "react-tap-event-plugin";
import _ from 'lodash';
injectTapEventPlugin();

export default class EntriesList extends Component {
  render() {
    const { movies } = this.props;
    return (
      <GridList
      cellHeight={200}
      style={{width: 320, height: 640, overflowY: 'auto'}}
      >
        {
          _.values(movies).map((movie, index) => <GridTile
            key={index}
            title={movie.title}
          ><img src={movie.images.poster} alt={movie.title}/></GridTile>)
        }
      </GridList>
    );
  }
}

EntriesList.propTypes = {
  movies: PropTypes.object
};

EntriesList.defaultProps = {
  movies: {}
};
