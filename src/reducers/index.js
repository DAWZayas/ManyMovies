import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';
import lists from './lists';
import entries from './entries';

export default combineReducers({
  router,
  lists,
  entries
});
