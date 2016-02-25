import { createStore, compose, applyMiddleware } from 'redux';
import { reduxReactRouter } from 'redux-router';
import createHistory from 'history/lib/createHashHistory';
import reducer from '../reducers';
import routes from '../routes';
import thunk from 'redux-thunk';
import { initUser } from '../Login/actions/creators';

const createStoreWithMiddleware = compose(
  applyMiddleware(thunk),
  reduxReactRouter({ routes, createHistory })
)(createStore);

export default function configureStore(initialState = {}) {
  const store = createStoreWithMiddleware(reducer, initialState);
  store.dispatch(initUser());
  return store;
}
