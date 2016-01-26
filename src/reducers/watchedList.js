import { SET_WATCHED_LIST } from '../Lists/actions/constants';

const setWatchedList = list => Object.assign({}, list);

export default function (state = {}, action) {
  switch (action.type) {
    case SET_WATCHED_LIST:
      return setWatchedList(action.list);
      default:
      return state;
  }
}
