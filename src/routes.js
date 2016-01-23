import React from 'react';
import { Route, Redirect, IndexRoute } from 'react-router';
import ListsContainer from './Lists/Lists';
import ListDetailsContainer from './Lists/ListDetails';
import App from './containers/App';
import SignIn from './Login';

export default (
  <Route path="/" component={App}>
    <Route path="SignIn" component={SignIn} />
    <Route path="lists" component={ListsContainer} />
    <Route path="lists/:user/:listsSlug" component={ListDetailsContainer} />
    <IndexRoute component={SignIn} />
    <Redirect path="*" to="/" />
  </Route>
);
