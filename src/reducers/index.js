import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';
import lists from './lists';
import entries from './entries';
import movies from './movies';
import comments from './comments';
import users from './users';
import userLikes from './userLikes';
import userDislikes from './userDislikes';
import userRatings from './userRatings';
import posts from './posts';
import watchedPost from './watchedPost';
import watchedMovie from './watchedMovie';
import watchedList from './watchedList';
import watchedEntries from './watchedEntries';

export default combineReducers({
  lists,
  entries,
  movies,
  comments,
  users,
  userLikes,
  userDislikes,
  userRatings,
  posts,
  router,
  watchedPost,
  watchedMovie,
  watchedList,
  watchedEntries
});
