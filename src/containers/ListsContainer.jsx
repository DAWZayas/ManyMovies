import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import Lists from '../components/Lists';
import _ from 'lodash';
import { getSlug } from '../utils';
import { setLists } from '../actions';
import firebase from '../utils/firebase';

function createList(title, desc) {
  const listsRef = firebase.child('lists/Gotre');
  const idList = listsRef.push().key();
  listsRef.once('value', (snapshot) => {
    const slug = getSlug(snapshot.val(), title, idList);
    listsRef.child(idList).set({
        custom: true,
        id: idList,
        title,
        desc,
        slug
      },
      error => console.log(error)
    );
  });
}

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
    createList: (title, desc) => createList(title, desc),
    registerListeners: () => registerListeners(dispatch),
    unregisterListeners: () => unregisterListeners(dispatch)
  };
}
function registerListeners(dispatch){
  const ref = firebase.child('lists/Gotre');
  ref.on('value', snapshot => dispatch(setLists(snapshot.val())));
}

function unregisterListeners(dispatch){
  const ref = firebase.child('lists/Gotre');
  ref.off();
  dispatch(setLists({}));
  debugger;
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lists);
