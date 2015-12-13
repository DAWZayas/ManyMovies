import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { editListAndNavigate, deleteListAndNavigate, removeEntry, addEntry } from '../actions';
import _ from 'lodash';
import Colors from 'material-ui/lib/styles/colors';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import ListDetailsHead from '../components/ListDetailsHead';
import EntriesList from '../components/EntriesList';
import CommentsManager from '../components/CommentsManager';

class ListDetailsContainer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      lists,
      list,
      editListAndNavigate,
      deleteListAndNavigate,
      entries,
      movies,
      navigate,
      removeEntry,
      addEntry,
      comments
    } = this.props;

    return (
      <div>
        <ListDetailsHead
          lists={lists}
          list={list}
          editListAndNavigate={editListAndNavigate}
          deleteListAndNavigate={deleteListAndNavigate}
        />
        <Tabs
          inkBarStyle={{backgroundColor: Colors.deepOrange800, height:"0.3em", marginTop: "-0.3em"}}
        >
          <Tab style={{backgroundColor: Colors.orange600}}
           label="Movies">
            <EntriesList
              navigate={navigate}
              removeEntry={removeEntry}
              addEntry={addEntry}
              list={list}
              entries={entries}
              movies={movies}
            />
          </Tab>
          <Tab style={{backgroundColor: Colors.orange600}}
            label="Comments">
            <CommentsManager idCommented={list.id} comments={comments} />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

ListDetailsContainer.propTypes = {
  comments: PropTypes.array,
  entries: PropTypes.array,
  lists: PropTypes.object,
  list: PropTypes.object,
  movies: PropTypes.object,
  navigate: PropTypes.func,
  editListAndNavigate: PropTypes.func,
  deleteListAndNavigate: PropTypes.func,
  removeEntry: PropTypes.func,
  addEntry: PropTypes.func
};

ListDetailsContainer.defaultProps = {
  list: {},
  movies: {},
  entries: [],
  comments: []
};

function _getEntriesInList(state, id){
  return state.entries[id];
}

function _getMoviesInList(state, id){
  const entries = _getEntriesInList(state, id);
  const allMovies = state.movies;
  const movies = entries ? entries.reduce((prev, actual) => Object.assign(prev, _.pick(allMovies, actual)), {}) : {};
  return movies;
}

function _getCommentsInList(state, id){
  return state.comments[id];
}

function mapStateToProps(state) {
  const slug = state.router.params.listsSlug;
  const { lists } = state;
  const id = _.findKey(lists, { slug });
  const list = lists[id];
  const movies = _getMoviesInList(state, id);
  const comments = _getCommentsInList(state, id);
  return { lists, list, movies, comments };
}

function mapDispatchToProps(dispatch) {
  return {
    navigate: path => dispatch(pushState(null, path)),
    editListAndNavigate: (id, title, desc, slug) => dispatch(editListAndNavigate(id, title, desc, slug)),
    deleteListAndNavigate: (id) => dispatch(deleteListAndNavigate(id)),
    removeEntry: (idCollection, id) => dispatch(removeEntry(idCollection, id)),
    addEntry: (idCollection, id) => dispatch(addEntry(idCollection, id))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListDetailsContainer);
