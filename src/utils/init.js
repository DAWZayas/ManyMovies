import { setDefaultLists, setDefaultEntries, setDefaultUsers }  from '../actions';
import configureStore from '../store';
import { defaultLists, defaultEntries, defaultUsers } from './examples';


export default function init() {
  const store = configureStore();
  store.dispatch(setDefaultEntries(defaultEntries));
  store.dispatch(setDefaultLists(defaultLists));
  store.dispatch(setDefaultUsers(defaultUsers));
  return store;
}
