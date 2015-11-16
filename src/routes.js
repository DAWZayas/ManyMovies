import React from 'react';
import { Route, Redirect } from 'react-router';
import AppContainer from './containers/AppContainer';
import ListsContainer from './containers/ListsContainer';
import ListDetailsContainer from './containers/ListDetailsContainer';
<<<<<<< HEAD
import App from './containers/App';

=======
import MovieDetails from './components/MovieDetails';
import Searcher from './components/Searcher';
>>>>>>> 5de60c406e93c613f41f894bc0c91247a9c22df5

export default (
  <Route path="/" component={App}>
    <Route path="lists" component={ListsContainer} />
    <Route path="lists/:listsSlug" component={ListDetailsContainer} />
<<<<<<< HEAD
    <Route path="movies" component={AppContainer} />
=======
    <Route path="movie-details" component={MovieDetails} />
    <Route path="search" component={Searcher} />
>>>>>>> 5de60c406e93c613f41f894bc0c91247a9c22df5
    <Redirect path="*" to="/" />
  </Route>
);
