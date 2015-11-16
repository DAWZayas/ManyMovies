import React, { Component, PropTypes } from 'react';
import GridList from 'material-ui/lib/grid-list/grid-list';
import MovieGrid from './MovieGrid';
import _ from 'lodash';
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

export default class EntriesList extends Component {
  constructor(props) {
    super(props);
    this.state = { resizeHandler: this._updateDimensions.bind(this) };
  }

  componentWillMount(){
    this._updateDimensions();
  }

  componentDidMount(){
    window.addEventListener("resize", this.state.resizeHandler);
  }

  componentWillUnmount(){
    window.removeEventListener("resize", this.state.resizeHandler);
  }

  _updateDimensions(){
    this.setState({ width: document.documentElement.clientWidth });
  }

  render() {
    const { movies, removeEntry, list, navigate } = this.props;
    return (
      <GridList
        padding={0}
        cols={this.state.width / 160}
        cellHeight={240}
        style={{ width: this.state.width, overflowY: "auto" }}
      >
        {
          _.values(movies) && _.values(movies).map((movie) => (
            <MovieGrid
              key={movie.ids.trakt}
              movie={movie}
              navigate={navigate}
              removeEntry={removeEntry}
              idList={list.id}
            />)
        )}
      </GridList>
    );
  }
}

EntriesList.propTypes = {
  list: PropTypes.object,
  movies: PropTypes.object,
  removeEntry: PropTypes.func,
  navigate: PropTypes.func
};

EntriesList.defaultProps = {
  movies: {}
};
