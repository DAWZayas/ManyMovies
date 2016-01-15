import { SET_WATCHED_POST, SET_WATCHED_POST_IMG, CLEAR_WATCHED_POST } from '../actions';

const setWatchedPost = (state, post) => Object.assign({}, state, post);

const setWatchedPostImg = (state, img) => Object.assign({}, state, { image: img });

const clearWatchedPost = () => ({});

export default function (state = {}, action) {
  switch (action.type) {
    case SET_WATCHED_POST:
      return setWatchedPost(state, action.post);
    case SET_WATCHED_POST_IMG:
      return setWatchedPostImg(state, action.img);
    case CLEAR_WATCHED_POST:
      return clearWatchedPost();
    default:
      return state;
  }
}
