/*
* Action types
*/
export const SET_DEFAULT_USERS = 'SET_DEFAULT_USERS';

/**
*Users action creators
*/

export const setDefaultUsers = users => ({type: SET_DEFAULT_USERS, users});
