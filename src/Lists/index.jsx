import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { sortBy} from 'lodash';
import { registerListeners, unregisterListeners } from './listeners';
import Lists from './Lists';
import { createList } from './side-actions';

function mapStateToProps(state) {
  const defaultSlugs = ['history', 'collection', 'watchlist'];
  const { lists, user } = state;
  const customLists = sortBy(lists.filter(list => list.custom), 'title');
  const defaultLists = sortBy(lists.filter(list => defaultSlugs.indexOf(list.slug) !== -1), 'title');
  return {
    defaultLists,
    lists: customLists,
    user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    navigate: path => dispatch(pushState(null, path)),
    createList: (title, desc, userId) => createList(title, desc, userId),
    registerListeners: userId => registerListeners(dispatch, userId),
    unregisterListeners: userId => unregisterListeners(dispatch, userId)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lists);
