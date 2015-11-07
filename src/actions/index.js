/*
* Action types
*/
export const SET_DEFAULT_LISTS = 'SET_DEFAULT_LISTS';
export const CREATE_LIST = 'CREATE_LIST';
export const DELETE_LIST = 'DELETE_LIST';
export const EDIT_LIST = 'EDIT_LIST';

export const ADD_ELEMENT = 'ADD_ELEMENT';
export const REMOVE_ELEMENT = 'REMOVE_ELEMENT';

/**
* List action creators
*/

export function setDefaultLists(lists) {
  return {
    type: SET_DEFAULT_LISTS,
    lists
  };
}

export function deleteList(id){
  return {
    type: DELETE_LIST,
    id
  };
}

export function creteList(title, desc) {
  return {
    type: CREATE_LIST,
    title,
    desc
  };
}
