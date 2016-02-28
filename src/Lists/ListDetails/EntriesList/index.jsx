import React, { Component, PropTypes } from 'react';
import GridList from 'material-ui/lib/grid-list/grid-list';
import MovieGrid from './MovieGrid';
import Snackbar from 'material-ui/lib/snackbar';

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
    const { addEntry, list, user } = this.props;
    const { removedEntry } = this.state;
    addEntry(list.id, removedEntry, user.userName);
    this.refs.snack.dismiss();
  }

  render() {
    const { movies, removeEntry, list, navigate, user, owner } = this.props;
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
        style={{ width: this.state.width, overflowY: "auto", marginLeft: (this.state.width % 160) /  2}}
      >
        {
          movies.map((movie) => (
            <MovieGrid
              key={movie.ids.trakt}
              movie={movie}
              navigate={navigate}
              removeEntry={removeEntry}
              handleSnackBarRequest={this._handleSnackBarRequest.bind(this)}
              idList={list.id}
              user={user}
              owner={owner}
            />)
        )}
      {snackBar}
      </GridList>
    );
  }
}

EntriesList.propTypes = {
  user: PropTypes.object,
  list: PropTypes.object,
  movies: PropTypes.array,
  addEntry: PropTypes.func,
  removeEntry: PropTypes.func,
  navigate: PropTypes.func,
  owner: PropTypes.bool
};

EntriesList.defaultProps = {
  movies: []
};
