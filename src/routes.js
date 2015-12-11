import React from 'react';
import { Route, Redirect, IndexRoute } from 'react-router';
import ListsContainer from './containers/ListsContainer';
import ListDetailsContainer from './containers/ListDetailsContainer';
import MoviesContainer from './containers/MoviesContainer';
import ProfileContainer from './containers/ProfileContainer';
import App from './containers/App';
import MovieDetailsContainer from './containers/MovieDetailsContainer';

export default (
  <Route path="/" component={App}>
    <Route path="profile" component={ProfileContainer} />
    <Route path="lists" component={ListsContainer} />
    <Route path="lists/:listsSlug" component={ListDetailsContainer} />
    <Route path="movies" component={MoviesContainer}/>
    <Route path="movies/:movieSlug" component={MovieDetailsContainer} />
    <IndexRoute component={MoviesContainer} />
    <Redirect path="*" to="/" />
  </Route>
);
