import React, { Component, PropTypes } from 'react';
import GridList from 'material-ui/lib/grid-list/grid-list';
import MovieGrid from './MovieGrid';
import Snackbar from 'material-ui/lib/snackbar';
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

  _handleSnackBarRequest(idEntry){
    this.setState({removedEntry: idEntry});
    this.refs.snack.show();
  }

  _handleSnackBarUndo(){
    const { addEntry, list } = this.props;
    const { removedEntry } = this.state;
    addEntry(list.id, removedEntry);
    this.refs.snack.dismiss();
  }

  render() {
    const { movies, removeEntry, list, navigate } = this.props;
    const snackBar = (
        <Snackbar
        ref="snack"
        message="Movie removed from list"
        action="undo"
        onActionTouchTap={this._handleSnackBarUndo.bind(this)}
        />
      );
    return (
      <GridList
        padding={0}
        cols={this.state.width / 160}
        cellHeight={240}
        style={{ width: this.state.width, overflowY: "auto", padding: '1.5rem 3em' }}
      >
        {
          _.values(movies) && _.values(movies).map((movie) => (
            <MovieGrid
              key={movie.ids.trakt}
              movie={movie}
              navigate={navigate}
              removeEntry={removeEntry}
              handleSnackBarRequest={this._handleSnackBarRequest.bind(this)}
              idList={list.id}
            />)
        )}
      {snackBar}
      </GridList>
    );
  }
}

EntriesList.propTypes = {
  list: PropTypes.object,
  movies: PropTypes.object,
  addEntry: PropTypes.func,
  removeEntry: PropTypes.func,
  navigate: PropTypes.func
};

EntriesList.defaultProps = {
  movies: {}
};
