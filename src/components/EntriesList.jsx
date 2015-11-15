import React, { Component, PropTypes } from 'react';
import GridList from 'material-ui/lib/grid-list/grid-list';
import MovieGrid from './MovieGrid';
import injectTapEventPlugin from "react-tap-event-plugin";
import _ from 'lodash';
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
    const { movies, removeEntry, list } = this.props;
    return (
      <GridList
        padding={0}
        cols={this.state.width / 160}
        cellHeight={240}
        style={{ width: this.state.width, overflowY: "auto" }}
      >
        {
          _.values(movies) && _.values(movies).map((movie, index) => (
            <MovieGrid
              key={index}
              movie={movie}
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
  removeEntry: PropTypes.func
};

EntriesList.defaultProps = {
  movies: {}
};
