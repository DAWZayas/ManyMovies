import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import _ from 'lodash';
import EntriesList from '../components/EntriesList';

class MovieDetailsContainer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { movies } = this.props;
    return (
      <EntriesList movies={movies} />
    );
  }
}

MovieDetailsContainer.propTypes = {
  movies: PropTypes.object
};

MovieDetailsContainer.defaultProps = {
  movies: {}
};

const _getMoviesInList = state => state.movies;

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
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieDetailsContainer);
