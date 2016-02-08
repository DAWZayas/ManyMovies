import React, { Component, PropTypes } from 'react';
import CardText from 'material-ui/lib/card/card-text';
import Card from 'material-ui/lib/card/card';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import SearchedMovie from './SearchedMovie';
import IconButton from 'material-ui/lib/icon-button';
import SearchIcon from 'material-ui/lib/svg-icons/action/search';
import Spinner from '../../../Widgets/Spinner';
import { makeTrendingRequest, makeMovieRequest, makePopularRequest, makeQueryRequest, makeBoxOfficeRequest } from '../../../utils/requests';
import { formatQuery } from '../../../utils/';
import { values, keys } from 'lodash';

const buttonStyle = {
  margin: '1em',
};

export default class MovieSearcher extends Component {

  constructor(props) {
    super(props);
    this.state = { searchedMovies: [] };
  }

  _getTrendingMovies() {
    this.setState({ searchedMovies: [], searchingMovies: true });
    const request = makeTrendingRequest();
    request.then(this._setSearchedMovies.bind(this));
  }

  _getPopularMovies() {
    this.setState({ searchedMovies: [], searchingMovies: true });
    const request = makePopularRequest();
    request.then(this._setSearchedMovies.bind(this));
  }

  _getBoxOfficeMovies() {
    this.setState({ searchedMovies: [], searchingMovies: true });
    const request = makeBoxOfficeRequest();
    request.then(this._setSearchedMovies.bind(this));
  }

  _getSearchedMovies() {
    const movieSearchNode = this.refs.movieSearched;
    const queryText = formatQuery(movieSearchNode.getValue());
    if (!queryText){
      movieSearchNode.setErrorText('Enter a valid search term');
      movieSearchNode.focus();
      movieSearchNode.clearValue();
    }else {
      this.setState({ searchedMovies: [], searchingMovies: true });
      const request = makeQueryRequest(queryText);
      request.then(slugs => Promise.all(
                            slugs.map(makeMovieRequest))
                          .then(this._setSearchedMovies.bind(this)));
    }
  }

  _setSearchedMovies(movies){
    this.setState({ searchedMovies: movies, searchingMovies: false });
  }

  render() {
    const { searchedMovies, searchingMovies } = this.state;
    const { movies, addMovie } = this.props;
    const spinner = searchingMovies ? <Spinner style={{margin: '1em'}}/> : null;
    return (
      <span>
        <Card style={{margin: '1em', padding: '1em', textAlign: 'center'}}>
          <CardText>Search for new movies in Trakt to add to Firebase</CardText>
          <CardText>
            <RaisedButton label="Trending" onTouchTap={this._getTrendingMovies.bind(this)} style={buttonStyle} />
            <RaisedButton label="Popular" onTouchTap={this._getPopularMovies.bind(this)} style={buttonStyle} />
            <RaisedButton label="Box Office" onTouchTap={this._getBoxOfficeMovies.bind(this)} style={buttonStyle} />
          </CardText>
          <TextField
            ref="movieSearched"
            hintText="Search a movie"
            fullWidth
            />
          <IconButton
            onTouchTap={this._getSearchedMovies.bind(this)}
            >
            <SearchIcon/>
          </IconButton>
        </Card>
        {
          spinner
        }
        { searchedMovies.map(movie => {
          const id = keys(movie)[0];
          return (
            <SearchedMovie
              key={id} id={id} movie={values(movie)[0]} cached={movies[id] !== undefined} addMovie={addMovie}
            />);
          }
        )}
      </span>
    );
  }
}

MovieSearcher.propTypes = {
  movies: PropTypes.object,
  addMovie: PropTypes.func
};
