import { SET_LISTS, SET_WATCHED_LIST } from './constants';

export const setLists = lists => ({type: SET_LISTS, lists});

export const setWatchedList = list => ({type: SET_WATCHED_LIST, list});
