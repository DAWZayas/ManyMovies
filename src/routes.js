import React from 'react';
import { Route, Redirect, IndexRoute } from 'react-router';
import ListsContainer from './containers/ListsContainer';
import ListDetailsContainer from './containers/ListDetailsContainer';
import MoviesContainer from './containers/MoviesContainer';
import Comment from './components/Comment';
import App from './containers/App';
import MovieDetails from './components/MovieDetails';

export default (
  <Route path="/" component={App}>
    <Route path="lists" component={ListsContainer} />
    <Route path="lists/:listsSlug" component={ListDetailsContainer} />
    <Route path="movies" component={MoviesContainer}/>
    <Route path="movie-details" component={MovieDetails} />
    <Route path="comment" component={Comment} />
    <IndexRoute component={MoviesContainer} />
    <Redirect path="*" to="/" />
  </Route>
);
