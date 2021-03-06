import { createStore, compose, applyMiddleware } from 'redux';
import { reduxReactRouter } from 'redux-router';
import useScroll from 'scroll-behavior/lib/useScrollToTop';
import createHistory from 'history/lib/createHashHistory';
import reducer from '../reducers';
import routes from '../routes';
import thunk from 'redux-thunk';
import { initUser } from '../Login/actions/creators';
import DevTools from '../containers/DevTools';
import createLogger from 'redux-logger';


const createStoreWithMiddleware = compose(
  applyMiddleware(thunk),
  reduxReactRouter({
    routes,
    createHistory: useScroll(createHistory)
  }),
  applyMiddleware(createLogger({
    predicate: (getState, action) => action === action
  })),
  DevTools.instrument()
)(createStore);

export default function configureStore(initialState = {}) {

  const store = createStoreWithMiddleware(reducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  store.dispatch(initUser());

  return store;
}
