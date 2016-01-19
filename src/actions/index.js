import { pushState } from 'redux-router';
import sequencer from './sequencer';

/*
* Action types
*/
export const SET_DEFAULT_LISTS = 'SET_DEFAULT_LISTS';
export const CREATE_LIST = 'CREATE_LIST';
export const DELETE_LIST = 'DELETE_LIST';
export const EDIT_LIST = 'EDIT_LIST';

export const SET_DEFAULT_ENTRIES = 'SET_DEFAULT_ENTRIES';
export const ADD_ENTRY = 'ADD_ENTRY';
export const REMOVE_ENTRY = 'REMOVE_ENTRY';

export const SET_DEFAULT_MOVIES = 'SET_DEFAULT_MOVIES';
/*
export const SET_COMMENTS = 'SET_COMMENTS';
export const SET_USER_LIKES = 'SET_USER_LIKES';
export const SET_USER_DISLIKES = 'SET_USER_DISLIKES';
*/
export const EDIT_USER = 'EDIT_USER';
export const SET_DEFAULT_USERS = 'SET_DEFAULT_USERS';

export const RATE_MOVIE = 'RATE_MOVIE';
export const CHANGE_MOVIE_RATING = 'CHANGE_MOVIE_RATING';

export const SET_POSTS = 'SET_POSTS';
export const SET_POST_IMG = 'SET_POST_IMG';
export const SET_WATCHED_POST = 'SET_WATCHED_POST';
export const SET_WATCHED_POST_IMG = 'SET_WATCHED_POST_IMG';
export const CLEAR_WATCHED_POST = 'CLEAR_WATCHED_POST';

/**
* List action creators
*/

export const setDefaultLists = lists => ({type: SET_DEFAULT_LISTS, lists});

export function createList(title, desc) {
  return {
    type: CREATE_LIST,
    title,
    desc
  };
}

export function deleteList(id){
  return {
    type: DELETE_LIST,
    id
  };
}

export function deleteListAndNavigate(id){
  return dispatch => sequencer([
      () => dispatch(deleteList(id)),
      () => dispatch(pushState(null, '/lists'))
    ]);
}

export function editList(id, title, desc){
  return{
    type: EDIT_LIST,
    id,
    title,
    desc
  };
}

export function editListAndNavigate(id, title, desc, slug) {
  return dispatch => sequencer([
      () => dispatch(editList(id, title, desc)),
      () => dispatch(pushState(null, `/lists/${slug}`))
    ]);
}

/**
* Entries action creators
*/

export function setDefaultEntries(entries) {
  return {
    type: SET_DEFAULT_ENTRIES,
    entries
  };
}

export function addEntry(idCollection, id) {
  return{
    type: ADD_ENTRY,
    idCollection,
    id
  };
}

export function removeEntry(idCollection, id) {
  return {
    type: REMOVE_ENTRY,
    idCollection,
    id
  };
}

/**
* Movies action creators
*/

export const setDefaultMovies = movies => ({type: SET_DEFAULT_MOVIES, movies});


/**
*Comment action creators
*/
/*
export const setComments = comments => ({type: SET_COMMENTS, comments});
export const setUserLikes = likes => ({type: SET_USER_LIKES, likes});
export const setUserDislikes = dislikes => ({type: SET_USER_DISLIKES, dislikes});
*/

/**
*Users action creators
*/

export const setDefaultUsers = users => ({type: SET_DEFAULT_USERS, users});

export function editUser(user, newStats){
  return{
    type: EDIT_USER,
    user,
    newStats
  };
}

/**
* Movie rating action creators
*/

export function rateMovie(userName, idMovie, rating){
  return{
    type: RATE_MOVIE,
    userName,
    idMovie,
    rating
  };
}

export function changeMovieRating(userName, idMovie, rating, oldVote){
  return {
    type: CHANGE_MOVIE_RATING,
    idMovie,
    userName,
    oldVote,
    rating
  };
}

export const setPosts = posts => ({type: SET_POSTS, posts});

export const setPostImg = (id, image) => ({type: SET_POST_IMG, id, image});

export const setWatchedPost = post => ({type: SET_WATCHED_POST, post});

export const setWatchedPostImg = img => ({type: SET_WATCHED_POST_IMG, img});

export const clearWatchedPost = () => ({type: CLEAR_WATCHED_POST});
