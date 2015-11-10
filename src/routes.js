import React from 'react';
import { Route, Redirect } from 'react-router';
import App from './containers/App';
import ListsContainer from './containers/ListsContainer';

export default (
  <Route path="/" component={App}>
    <Route path="/lists" component={ListsContainer} />
    <Redirect path="*" to="/" />
  </Route>
);
