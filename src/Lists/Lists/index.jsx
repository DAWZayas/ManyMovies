import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import Lists from './Lists';
import { sortBy} from 'lodash';
import { registerListeners, unregisterListeners } from './listeners';
import { createList } from './side-actions';

function mapStateToProps(state) {
  const defaultSlugs = ['history', 'collection', 'watchlist'];
  const { lists } = state;
  const customLists = sortBy(lists.filter(list => list.custom), 'title');
  const defaultLists = sortBy(lists.filter(list => defaultSlugs.indexOf(list.slug) !== -1), 'title');
  return {
    defaultLists,
    lists: customLists,
    user: state.users.Gotre
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handler: path => dispatch(pushState(null, path)),
    createList: (title, desc) => createList(title, desc),
    registerListeners: () => registerListeners(dispatch),
    unregisterListeners: () => unregisterListeners(dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lists);
