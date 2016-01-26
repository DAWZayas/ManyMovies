import { SET_LISTS, SET_WATCHED_LIST, SET_ENTRIES, SET_WATCHED_ENTRIES } from './constants';

export const setLists = lists => ({type: SET_LISTS, lists});
export const setWatchedList = list => ({type: SET_WATCHED_LIST, list});
export const setEntries = entries => ({type: SET_ENTRIES, entries});
export const setWatchedEntries = entries => ({type: SET_WATCHED_ENTRIES, entries});
