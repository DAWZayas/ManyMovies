import { SET_LISTS } from '../Lists/actions/constants';

const setLists = lists => [].concat(lists);

export default function (state = [], action) {
  switch (action.type) {
    case SET_LISTS:
      return setLists(action.lists);
    default:
      return state;
  }
}
