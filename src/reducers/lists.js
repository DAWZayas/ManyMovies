import { SET_LISTS, EDIT_LIST } from '../actions';
import { getSlug} from '../utils';

const setLists = lists => Object.assign({}, lists);

function editList(state, id, title, desc) {
  let slug = getSlug(state.lists, title, id);
  let newList = { id, title, slug, desc, custom: true };
  return Object.assign({}, state, { [id] : newList });
}

export default function (state = {}, action) {
  switch (action.type) {
    case SET_LISTS:
      return setLists(action.lists);
    case EDIT_LIST:
      return editList(state, action.id, action.title, action.desc);
    default:
      return state;
  }
}

