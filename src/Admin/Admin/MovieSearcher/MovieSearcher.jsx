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

const styles = {
  button: { margin: '1em'}
};

export default class MovieSearcher extends Component {

  constructor(props) {
    super(props);
    this.state = { searchedMovies: [] };
  }

  _handleSearchButton(requestCreator){
    this.setState({ searchedMovies: [], searchingMovies: true });
    const request = requestCreator();
    request.then(this._setSearchedMovies.bind(this));
  }

  _getSearchingButtons(label, request) {
    return <RaisedButton key={label} label={label} onTouchTap={this._handleSearchButton.bind(this, request)} style={styles.button} />;
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
    const spinner = searchingMovies ? <Spinner style={{margin: '1em'}}/> : <span/>;
    const searchingButtons = [
      { label: 'Trending', request: makeTrendingRequest },
      { label: 'Popular', request: makePopularRequest },
      { label: 'Box Office', request: makeBoxOfficeRequest }
    ];
    return (
      <span>
        <Card style={{margin: '1em', padding: '1em', textAlign: 'center'}}>
          <CardText>Search for new movies in Trakt to add to Firebase</CardText>
          <CardText>
            {
              searchingButtons.map(button => this._getSearchingButtons(button.label, button.request))
            }
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
