import { setDefaultLists, setDefaultUsers }  from '../actions';
import configureStore from '../store';
import { defaultLists, defaultUsers } from './examples';


export default function init() {
  const store = configureStore();
  store.dispatch(setDefaultLists(defaultLists));
  store.dispatch(setDefaultUsers(defaultUsers));
  return store;
}
