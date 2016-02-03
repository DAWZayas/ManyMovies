import { updateMovieCreator, addMovieCreator } from './actions/creators';
import { values } from 'lodash';
import { updateMovieWithImages } from '../utils/movies';
import firebase from '../utils/firebase';

export const updateAllMovies = (movies, dispatch) => {
  values(movies).forEach(function(movie, index){
    setTimeout(() => { refreshMovie(movie, dispatch); }, 30 * index);
  });
};


function refreshMovie(movie, dispatch) {
  const slug = movie.ids.slug;
  const id = movie.ids.trakt;

  const request = new XMLHttpRequest();
  request.open('GET', `https://api-v2launch.trakt.tv/movies/${slug}?extended=full,images`);
  request.setRequestHeader('Content-Type', 'application/json');
  request.setRequestHeader('trakt-api-version', '2');
  request.setRequestHeader('trakt-api-key', 'dd37a4f55da46ea23c0ec3a82acfafb6862ba8fe56e667483c91fe43ebc3a4a7');

  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      const body = this.responseText;
      let movie = updateMovieWithImages(JSON.parse(body));
      firebase.child(`movies/${id}`).update(values(movie)[0], () => { dispatch(updateMovieCreator()); });
    }
  };

  request.send();
}

export const addMovie = (id, movie, dispatch) => {
  firebase.child(`movies/${id}`).setWithPriority(movie, movie.title, () => { dispatch(addMovieCreator()); });
};
