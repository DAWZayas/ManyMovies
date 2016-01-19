import { setDefaultLists, setDefaultEntries, setDefaultMovies, setDefaultUsers }  from '../actions';
import configureStore from '../store';
import { defaultLists, defaultEntries, defaultMovies, defaultUsers } from './examples';


export default function init() {
  const store = configureStore();
  store.dispatch(setDefaultEntries(defaultEntries));
  store.dispatch(setDefaultLists(defaultLists));
  store.dispatch(setDefaultMovies(defaultMovies));
  store.dispatch(setDefaultUsers(defaultUsers));
  return store;
}
