import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';
import lists from './lists';
import entries from './entries';
import movies from './movies';
import comments from './comments';
import users from './users';
import userLikes from './userLikes';
import userDislikes from './userDislikes';

export default combineReducers({
  router,
  lists,
  entries,
  movies,
  comments,
  users,
  userLikes,
  userDislikes
});
