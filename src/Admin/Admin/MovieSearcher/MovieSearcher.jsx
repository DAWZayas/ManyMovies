import React, { Component, PropTypes } from 'react';
import CardText from 'material-ui/lib/card/card-text';
import Card from 'material-ui/lib/card/card';
import RaisedButton from 'material-ui/lib/raised-button';
import SearchedMovie from './SearchedMovie';
import { formatMovieWithImages } from '../../../utils/movies';
import { values, keys } from 'lodash';

const buttonStyle = {
  margin: 12,
};

export default class MovieSearcher extends Component {

  constructor(props) {
    super(props);
    this.state = { searchedMovies: [] };
  }

  _getTrendingMovies() {
    const request = new Promise(function (resolve, reject) {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `https://api-v2launch.trakt.tv/movies/trending?extended=full,images`);

      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('trakt-api-version', '2');
      xhr.setRequestHeader('trakt-api-key', 'dd37a4f55da46ea23c0ec3a82acfafb6862ba8fe56e667483c91fe43ebc3a4a7');

      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          resolve(JSON.parse(xhr.response).map(data => formatMovieWithImages(data.movie)));
        } else {
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        }
      };

      xhr.onerror = function () {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      };

      xhr.send();
    });

    request.then(this._setSearchedMovies.bind(this));
  }

  _setSearchedMovies(movies){
    this.setState({ searchedMovies: movies });
  }

  render() {
    const { searchedMovies } = this.state;
    const { movies, addMovie } = this.props;
    return (
      <span>
        <Card style={{margin: '1em'}}>
          <CardText style={{textAlign: 'center'}}>Search for new movies in Trakt to add to Firebase</CardText>
          <div style={{textAlign: 'center'}}>
            <RaisedButton label="Trending" onTouchTap={this._getTrendingMovies.bind(this)} style={buttonStyle} />
            <RaisedButton label="Default" style={buttonStyle} />
            <RaisedButton label="Default" style={buttonStyle} />
          </div>
        </Card>
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
