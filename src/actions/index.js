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

export const CREATE_COMMENT = 'CREATE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const SET_DEFAULT_COMMENT = 'SET_DEFAULT_COMMENT';
export const LIKE_COMMENT = 'LIKE_COMMENT';
export const UNLIKE_COMMENT = 'UNLIKE_COMMENT';
export const DISLIKE_COMMENT = 'DISLIKE_COMMENT';
export const UNDISLIKE_COMMENT = 'UNDISLIKE_COMMENT';

export const EDIT_USER = 'EDIT_USER';
export const SET_DEFAULT_USERS = 'SET_DEFAULT_USERS';

export const RATE_MOVIE = 'RATE_MOVIE';
export const CHANGE_MOVIE_RATING = 'CHANGE_MOVIE_RATING';


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

export const setDefaultComments = comments => ({type: SET_DEFAULT_COMMENT, comments});

export function createComment(idCommented, text, userName) {
  return {
    type: CREATE_COMMENT,
    idCommented,
    text,
    userName
  };
}

export function removeComment(id, idCommented){
  return {
    type: DELETE_COMMENT,
    id,
    idCommented
  };
}

export function editComment(id, idCommented, text) {
  return{
    type: EDIT_COMMENT,
    id,
    idCommented,
    text
  };
}

export function likeComment(id, idCommented, userId){
  return{
    type: LIKE_COMMENT,
    id,
    idCommented,
    userId
  };
}

export function unlikeComment(id, idCommented, userId){
  return{
    type: UNLIKE_COMMENT,
    id,
    idCommented,
    userId
  };
}

export function unlikeAndDislikeComment(id, idCommented, userId) {
  return dispatch => sequencer([
      () => dispatch(unlikeComment(id, idCommented, userId)),
      () => dispatch(dislikeComment(id, idCommented, userId))
    ]);
}

export function dislikeComment(id, idCommented, userId){
  return{
    type: DISLIKE_COMMENT,
    id,
    idCommented,
    userId
  };
}

export function undislikeComment(id, idCommented, userId){
  return{
    type: UNDISLIKE_COMMENT,
    id,
    idCommented,
    userId
  };
}

export function undislikeAndLikeComment(id, idCommented, userId) {
  return dispatch => sequencer([
      () => dispatch(undislikeComment(id, idCommented, userId)),
      () => dispatch(likeComment(id, idCommented, userId))
    ]);
}

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
