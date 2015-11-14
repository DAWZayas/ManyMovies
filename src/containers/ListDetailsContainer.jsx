import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { editListAndNavigate, deleteListAndNavigate } from '../actions';
import _ from 'lodash';

import ListDetailsHead from '../components/ListDetailsHead';
import EntriesList from '../components/EntriesList';

class ListDetailsContainer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { lists, list, editListAndNavigate, deleteListAndNavigate, entries, movies } = this.props;
    return (
      <div>
        <ListDetailsHead
          lists={lists}
          list={list}
          editListAndNavigate={editListAndNavigate}
          deleteListAndNavigate={deleteListAndNavigate}
        />
        <EntriesList entries={entries} movies={movies} />
      </div>
    );
  }
}

ListDetailsContainer.propTypes = {
  lists: PropTypes.object,
  list: PropTypes.object,
  movies: PropTypes.object,
  editListAndNavigate: PropTypes.func,
  deleteListAndNavigate: PropTypes.func,
  entries: PropTypes.array
};

ListDetailsContainer.defaultProps = {
  list: {},
  movies: {},
  entries: []
};

function _getEntriesInList(state, id){
  return state.entries[id];
}

function _getMoviesInList(state, id){
  const entries = _getEntriesInList(state, id);
  const allMovies = state.movies;
  const movies = entries.reduce((prev, actual) => Object.assign(prev, _.pick(allMovies, actual)), {});
  return movies;
}

function mapStateToProps(state) {
  const slug = state.router.params.listsSlug;
  const { lists } = state;
  const id = _.findKey(lists, { slug });
  const list = lists[id];
  const movies = _getMoviesInList(state, id);
  return { lists, list, movies };
}

function mapDispatchToProps(dispatch) {
  return {
    handler: path => dispatch(pushState(null, path)),
    editListAndNavigate: (id, title, desc, slug) => dispatch(editListAndNavigate(id, title, desc, slug)),
    deleteListAndNavigate: (id) => dispatch(deleteListAndNavigate(id))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListDetailsContainer);
