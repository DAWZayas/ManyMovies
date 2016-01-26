import { SET_COMMENTS, SET_USER_LIKES, SET_USER_DISLIKES } from './constants';

export const setComments = comments => ({type: SET_COMMENTS, comments});
export const setUserLikes = likes => ({type: SET_USER_LIKES, likes});
export const setUserDislikes = dislikes => ({type: SET_USER_DISLIKES, dislikes});
