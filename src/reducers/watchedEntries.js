import { SET_WATCHED_ENTRIES } from '../Lists/actions/constants';

const setWatchedEntries = entries => [].concat(entries);

export default function (state = [], action) {
  switch (action.type) {
    case SET_WATCHED_ENTRIES:
      return setWatchedEntries(action.entries);
    default:
      return state;
  }
}
