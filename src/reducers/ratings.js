import { SET_DEFAULT_USER_RATINGS, SET_DEFAULT_MOVIE_RATINGS, EDIT_USER_RATING, EDIT_MOVIE_RATING } from '../actions';
import _ from 'lodash';
import { defaultUserRatings, defaultMovieRatings } from '../utils/examples';

const setDefaultUserRatings = state => Object.assign({}, state, defaultUserRatings);
const setDefaultMovieRatings = state => Object.assign({}, state, defaultMovieRatings);

const editUserRating = (state, user, idMovie) => Object.assign({}, state, Object.keys(user).map(key => user[key]);




export default function (state = {}, action) {
  switch (action.type) {
    case :
      return (state);
    case :
      return 
    default:
      return state;
  }
}



