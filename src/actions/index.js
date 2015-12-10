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
export const ENTRY_LIKE = 'USER_LIKES';
export const USER_LIKES = 'ENTRY_DISLIKE';

export const SET_DEFAULT_MOVIES = 'SET_DEFAULT_MOVIES';

export const CREATE_COMMENT = 'CREATE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const SET_DEFAULT_COMMENT = 'SET_DEFAULT_COMMENT';

export const EDIT_USER = 'EDIT_USER';
export const SET_DEFAULT_USERS = 'SET_DEFAULT_USERS';

export const SET_DEFAULT_USER_RATINGS = 'SET_DEFAULT_USER_RATINGS';
export const SET_DEFAULT_MOVIE_RATINGS = 'SET_DEFAULT_MOVIE_RATINGS';
export const EDIT_USER_RATING = 'EDIT_USER_RATING';
export const EDIT_MOVIE_RATING = 'EDIT_MOVIE_RATING';


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

export const entryLikes = (id, likesCount) => ({type: ENTRY_LIKE, id, likesCount});

export const userLikes = (id, userLikesCount) => ({type: USER_LIKES, id, userLikesCount});

/**
* Movies action creators
*/

export const setDefaultMovies = movies => ({type: SET_DEFAULT_MOVIES, movies});


/**
*Comment action creators
*/
export const setDefaultComments = comments => ({type: SET_DEFAULT_COMMENT, comments});

export function createComment(idCommented, text) {
  return {
    type: CREATE_COMMENT,
    idCommented,
    text
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
* Users rating and movies rating
*/
export const setDefaultMovieRatings = idMovie => ({type : SET_DEFAULT_MOVIE_RATINGS , idMovie });
export const setDefaultUserRatings = user, idMovie => ({type : SET_DEFAULT_USER_RATINGS, user, idMovie});

export function editUserRating (userName, idMovie){
  return{
    type: EDIT_USER_RATING,
    userName,
    idMovie :
      {
        vote : vote
      }
  };
}
export function editMovieRating (idMovie ){
  return {
    type: EDIT_MOVIE_RATING,
    idMovie :  
      { 
        totalVotes : totalVotes,
        totalNotes : totalNotes

      }
  };
}