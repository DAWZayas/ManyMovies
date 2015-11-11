import React from 'react';
import { Route, Redirect } from 'react-router';
import App from './containers/App';
import ListsContainer from './containers/ListsContainer';
import ListDetailsContainer from './containers/ListDetailsContainer';

export default (
  <Route path="/" component={App}>
    <Route path="lists" component={ListsContainer} />
    <Route path="lists/:listsSlug" component={ListDetailsContainer} />
    <Redirect path="*" to="/" />
  </Route>
);
