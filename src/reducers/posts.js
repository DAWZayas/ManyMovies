import { SET_DEFAULT_POSTS } from '../actions';
import { defaultPosts } from '../utils/examples';

const setDefaultPosts = () => [].concat(defaultPosts);

export default function (state = [], action) {
  switch (action.type) {
    case SET_DEFAULT_POSTS:
      return setDefaultPosts();
    default:
      return state;
  }
}

