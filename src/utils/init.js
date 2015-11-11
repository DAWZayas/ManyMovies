import { setDefaultLists, setDefaultEntries, setDefaultMovies }  from '../actions';
import configureStore from '../store';
import { defaultLists, defaultEntries, defaultMovies } from './examples';


export default function init() {
  const store = configureStore();
  store.dispatch(setDefaultEntries(defaultEntries));
  store.dispatch(setDefaultLists(defaultLists));
  store.dispatch(setDefaultMovies(defaultMovies));
  return store;
}
