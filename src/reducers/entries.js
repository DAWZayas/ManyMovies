import { SET_ENTRIES } from '../Lists/actions/constants';

const setEntries = entries => Object.assign({}, entries);

export default function (state = {}, action) {
  switch (action.type) {
    case SET_ENTRIES:
      return setEntries(action.entries);
    default:
      return state;
  }
}

