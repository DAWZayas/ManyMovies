import { SET_FOLLOWER_USERS, SET_FOLLOWING_USERS, CLEAR_FOLLOWERS, CLEAR_FOLLOWING, SET_WATCHED_PEOPLE } from './constants';

export const setFollowerUsers = users => ({type: SET_FOLLOWER_USERS, users});
export const setFollowingUsers = users => ({type: SET_FOLLOWING_USERS, users});
export const clearFollowers = () => ({type: CLEAR_FOLLOWERS});
export const clearFollowing = () => ({type: CLEAR_FOLLOWING});
export const setWatchedPeople = users => ({type: SET_WATCHED_PEOPLE, users});
