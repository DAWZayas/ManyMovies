import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import Table from 'material-ui/lib/table/table';
import TableBody from 'material-ui/lib/table/table-body';
import Paper from 'material-ui/lib/paper';
import FontIcon from 'material-ui/lib/font-icon';
import TextField from 'material-ui/lib/text-field';
import MovieRow from './MovieRow';
import MoviesListHeader from './MoviesListHeader';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default class Movies extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listedMovies: props.movies
    };
  }

  _handleKeyDown(e){
    if (e.keyCode === 27){
      this.refs.search.clearValue();
      this.refs.search.blur();
      this._showSearchedMovies();
    }
  }

  _handleSearchFocus(){
    this.refs.search.clearValue();
    this._showSearchedMovies();
  }

  _handleSearchChange(){
    this._showSearchedMovies();
  }

  _isSearched(value){
    const searchTerm = this.refs.search.getValue().toLowerCase().trim();
    const title = value.title.toLowerCase();
    return title.indexOf(searchTerm) !== -1;
  }

  _showSearchedMovies(){
    const listedMovies = _.pick(this.props.movies, this._isSearched, this);
    this.setState({listedMovies});
  }

  render() {
    return (
      <div>
        <Paper style={{display: "flex", justifyContent: "center"}}>
          <FontIcon style={{lineHeight: "2em"}} className="material-icons">search</FontIcon>
          <TextField
            ref="search"
            style={{flexGrow: "20"}}
            hintText="Search a movie"
            onChange={this._handleSearchChange.bind(this)}
            onFocus={this._handleSearchFocus.bind(this)}
            onKeyDown={this._handleKeyDown.bind(this)}
          />
        </Paper>
        <Table
          height={this.state.height}
          fixedHeader
          selectable={false}
        >
          { MoviesListHeader }
          <TableBody
            displayRowCheckbox={false}
            showRowHover
            stripedRows={false}
          >
            {
              _.values(this.state.listedMovies).map((movie, index) => (
                  <MovieRow key={index} navigate={this.props.navigate} movie={movie}/>
                )
              )
            }
          </TableBody>
        </Table>
      </div>
    );
  }
}

Movies.propTypes = {
  movies: PropTypes.object,
  navigate: PropTypes.func
};

Movies.defaultProps = {
  movies: []
};
