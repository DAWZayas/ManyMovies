import React from 'react';
import { Route, Redirect, IndexRoute } from 'react-router';
import ListsContainer from './containers/ListsContainer';
import ListDetailsContainer from './containers/ListDetailsContainer';
import MoviesContainer from './containers/MoviesContainer';
import ProfileContainer from './containers/ProfileContainer';
import App from './containers/App';
import MovieDetailsContainer from './containers/MovieDetailsContainer';
import PremieresContainer from './containers/PremieresContainer';
import NewsContainer from './containers/NewsContainer';
import NewsDetailsContainer from './containers/NewsDetailsContainer';

export default (
  <Route path="/" component={App}>
    <Route path="profile" component={ProfileContainer} />
    <Route path="lists" component={ListsContainer} />
    <Route path="lists/:listsSlug" component={ListDetailsContainer} />
    <Route path="movies" component={MoviesContainer} />
    <Route path="movies/:movieSlug" component={MovieDetailsContainer} />
    <Route path="premieres" component={PremieresContainer} />
    <Route path="news" component={NewsContainer} />
    <Route path="news/:newsSlug" component={NewsDetailsContainer} />
    <IndexRoute component={NewsContainer} />
    <Redirect path="*" to="/" />
  </Route>
);
