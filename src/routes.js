import React from 'react';
import { Route, Redirect } from 'react-router';
import AppContainer from './containers/AppContainer';
import ListsContainer from './containers/ListsContainer';
import ListDetailsContainer from './containers/ListDetailsContainer';
import App from './containers/App';


export default (
  <Route path="/" component={App}>
    <Route path="lists" component={ListsContainer} />
    <Route path="lists/:listsSlug" component={ListDetailsContainer} />
    <Route path="movies" component={AppContainer} />
    <Redirect path="*" to="/" />
  </Route>
);
