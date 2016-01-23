import { SET_WATCHED_LIST } from '../Lists/actions/constants';

const setWatchedList = (state, list) => Object.assign({}, state, list);

export default function (state = {}, action) {
  switch (action.type) {
    case SET_WATCHED_LIST:
      return setWatchedList(state, action.list);
      default:
      return state;
  }
}
