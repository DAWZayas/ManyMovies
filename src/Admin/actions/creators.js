import { UPDATE_MOVIE, CLEAR_UPDATE_QUEUE, ADD_MOVIE } from './constants';

export const updateMovieCreator = () => ({type: UPDATE_MOVIE});
export const clearUpdateQueue = () => ({type: CLEAR_UPDATE_QUEUE});
export const addMovieCreator = () => ({type: ADD_MOVIE});
