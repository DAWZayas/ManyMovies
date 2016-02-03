import { UPDATE_MOVIE, CLEAR_UPDATE_QUEUE, ADD_MOVIE } from '../Admin/actions/constants';

export default function (state = 0, action) {
  switch (action.type) {
    case UPDATE_MOVIE:
      return state + 1;
    case CLEAR_UPDATE_QUEUE:
      return 0;
    case ADD_MOVIE:
      return state === 0 ? state : state + 1;
    default:
      return state;
  }
}

