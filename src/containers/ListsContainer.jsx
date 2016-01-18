import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { createList } from '../actions';
import Lists from '../components/Lists';
import _ from 'lodash';
import { setLists } from '../actions';
import firebase from '../utils/firebase';

function mapStateToProps(state) {
  const defaultSlugs = ['history', 'collection', 'watchlist'];
  const lists = _.values(state.lists);
  const customLists = _.sortBy(lists.filter(list => list.custom), 'title');
  const defaultLists = _.sortBy(lists.filter(list => defaultSlugs.indexOf(list.slug) !== -1), 'title');
  return {
    defaultLists,
    lists: customLists
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handler: path => dispatch(pushState(null, path)),
    createList: (title, desc) => dispatch(createList(title, desc)),
    registerListeners: () => registerListeners(dispatch),
    unregisterListeners: () => unregisterListeners(dispatch)
  };
}
function registerListeners(dispatch){
  const ref = firebase.child('lists');
  ref.on('value', snapshot => dispatch(setLists(snapshot.val())));
}

function unregisterListeners(dispatch){
  const ref = firebase.child('lists');
  ref.off();
  dispatch(setLists([]));
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lists);
