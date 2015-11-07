import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';
import lists from './lists';

export default combineReducers({
  router,
  lists
});
