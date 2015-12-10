import { setDefaultLists, setDefaultEntries, setDefaultMovies, setDefaultComments, setDefaultUsers, setDefaultMovieRatings, setDefaultUserRatings }  from '../actions';
import configureStore from '../store';
import { defaultLists, defaultEntries, defaultMovies, defaultComments, defaultUsers, defaultUserRatings, defaultMovieRatings } from './examples';


export default function init() {
  const store = configureStore();
  store.dispatch(setDefaultEntries(defaultEntries));
  store.dispatch(setDefaultLists(defaultLists));
  store.dispatch(setDefaultMovies(defaultMovies));
  store.dispatch(setDefaultComments(defaultComments));
  store.dispatch(setDefaultUserRatings(defaultUserRatings));
  store.dispatch(setDefaultMovieRatings(defaultMovieRatings));
  return store;
}
