import { setDefaultLists, setDefaultEntries, setDefaultMovies, setDefaultComments, setDefaultUsers, setDefaultPosts }  from '../actions';
import configureStore from '../store';
import { defaultLists, defaultEntries, defaultMovies, defaultComments, defaultUsers, defaultPosts } from './examples';


export default function init() {
  const store = configureStore();
  store.dispatch(setDefaultEntries(defaultEntries));
  store.dispatch(setDefaultLists(defaultLists));
  store.dispatch(setDefaultMovies(defaultMovies));
  store.dispatch(setDefaultComments(defaultComments));
  store.dispatch(setDefaultUsers(defaultUsers));
  store.dispatch(setDefaultPosts(defaultPosts));
  return store;
}
