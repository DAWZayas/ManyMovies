import firebase from '../../utils/firebase';
import { pushState } from 'redux-router';
import { getSlug } from '../../utils';

/*
function _getEntriesInList(state, id){
  return state.entries[id];
}

function _getMoviesInList(state, id){
  const entries = _getEntriesInList(state, id);
  const allMovies = state.movies;
  const movies = entries ? entries.reduce((prev, actual) => Object.assign(prev, _.pick(allMovies, actual)), {}) : {};
  return movies;
}

function _getCommentsInList(state, id){
  return state.comments[id];
}
*/
export function deleteListAndNavigate(user, id, dispatch){
  firebase.child(`lists/${user}/${id}`).remove(function (error){
    if (error) {
      console.log(error);
    }else {
      dispatch(pushState(null, '/lists'));
    }
  });
}

export function editListAndNavigate(user, id, title, desc) {
  const listsRef = firebase.child(`lists/${user}/${id}`);
  const slug = getSlug(listsRef, title, id);
  listsRef.update({
    title, desc, slug
    },
      error => console.log(error)
  );
}
