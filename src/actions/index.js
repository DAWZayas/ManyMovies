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
