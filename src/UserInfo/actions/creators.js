import { SET_WATCHED_USER, SET_WATCHED_USER_FOLLOWERS, SET_WATCHED_USER_FOLLOWING, CLEAR_WATCHED_USER_FOLLOWERS, CLEAR_WATCHED_USER_FOLLOWING } from './constants';

export const setWatchedUser = watchedUser => ({type: SET_WATCHED_USER, watchedUser});
export const setWatchedUserFollowers = users => ({type: SET_WATCHED_USER_FOLLOWERS, users});
export const setWatchedUserFollowing = users => ({type: SET_WATCHED_USER_FOLLOWING, users});
export const clearWatchedUserFollowers = () => ({type: CLEAR_WATCHED_USER_FOLLOWERS});
export const clearWatchedUserFollowing = () => ({type: CLEAR_WATCHED_USER_FOLLOWING});
