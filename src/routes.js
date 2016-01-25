import React from 'react';
import { Route, Redirect, IndexRoute } from 'react-router';
import ListsContainer from './Lists';
import ListDetailsContainer from './Lists/ListDetails';
import MoviesContainer from './Movies';
import GenresContainer from './Movies/ByGenre';
import ProfileContainer from './containers/ProfileContainer';
import App from './App';
import MovieDetailsContainer from './Movies/MovieDetails';
import PremieresContainer from './containers/PremieresContainer';
import NewsContainer from './News';
import NewsDetailsContainer from './News/NewsDetails';

export default (
  <Route path="/" component={App}>
    <Route path="profile" component={ProfileContainer} />
    <Route path="lists" component={ListsContainer} />
    <Route path="lists/:user/:listsSlug" component={ListDetailsContainer} />
    <Route path="byGenre" component={GenresContainer} />
    <Route path="movies" component={MoviesContainer} />
    <Route path="movies/:movieSlug" component={MovieDetailsContainer} />
    <Route path="premieres" component={PremieresContainer} />
    <Route path="news" component={NewsContainer} />
    <Route path="news/:newsSlug" component={NewsDetailsContainer} />
    <IndexRoute component={NewsContainer} />
    <Redirect path="*" to="/" />
  </Route>
);
