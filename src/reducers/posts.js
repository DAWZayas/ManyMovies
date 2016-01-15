import { SET_POSTS, SET_POST_IMG } from '../actions';

const setPosts = (posts) => [].concat(posts);

const setPostImage = (state, id, image) => {
  return state.map(post => post.id !== id ? post : Object.assign({}, post, {image: image}));
};

export default function (state = [], action) {
  switch (action.type) {
    case SET_POSTS:
      return setPosts(action.posts);
    case SET_POST_IMG:
      return setPostImage(state, action.id, action.image);
    default:
      return state;
  }
}

