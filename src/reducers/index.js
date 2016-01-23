import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';
import lists from './lists';
import users from './users';
import firebase from './firebase';
import watchedList from './watchedList';

export default combineReducers({
  firebase,
  lists,
  users,
  router,
  watchedList
});
