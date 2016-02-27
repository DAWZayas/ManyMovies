import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';
import lists from './lists';
import entries from './entries';
import movies from './movies';
import comments from './comments';
import userLikes from './userLikes';
import auth from './auth';
import userDislikes from './userDislikes';
import userRatings from './userRatings';
import posts from './posts';
import watchedPost from './watchedPost';
import watchedMovie from './watchedMovie';
import watchedList from './watchedList';
import watchedPeople from './watchedPeople';
import watchedEntries from './watchedEntries';
import updatedMovies from './updatedMovies';
import followers from './followers';
import following from './following';
import user from './user';

export default combineReducers({
  lists,
  entries,
  movies,
  comments,
  auth,
  userLikes,
  userDislikes,
  userRatings,
  following,
  followers,
  posts,
  router,
  watchedPost,
  watchedPeople,
  watchedMovie,
  watchedList,
  watchedEntries,
  updatedMovies,
  user
});
