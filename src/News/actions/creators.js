import { SET_POSTS, SET_POST_IMG, SET_WATCHED_POST, SET_WATCHED_POST_IMG, CLEAR_WATCHED_POST } from './constants';

export const setPosts = posts => ({type: SET_POSTS, posts});
export const setPostImg = (id, image) => ({type: SET_POST_IMG, id, image});
export const setWatchedPost = post => ({type: SET_WATCHED_POST, post});
export const setWatchedPostImg = img => ({type: SET_WATCHED_POST_IMG, img});
export const clearWatchedPost = () => ({type: CLEAR_WATCHED_POST});
