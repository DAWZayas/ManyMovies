import React from 'react';
import { Route, Redirect } from 'react-router';
import ListsContainer from './containers/ListsContainer';
import ListDetailsContainer from './containers/ListDetailsContainer';
import App from './containers/App';
import MovieDetails from './components/MovieDetails';
import Searcher from './components/Searcher';

export default (
  <Route path="/" component={App}>
    <Route path="lists" component={ListsContainer} />
    <Route path="lists/:listsSlug" component={ListDetailsContainer} />
<<<<<<< HEAD
    <Route path="movies" component={AppContainer} />
=======
>>>>>>> 1d030db7089f608237a6213eed5bb9197c649cd3
    <Route path="movie-details" component={MovieDetails} />
    <Route path="search" component={Searcher} />
    <Redirect path="*" to="/" />
  </Route>
);
