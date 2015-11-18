import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import _ from 'lodash';

class MovieDetailsContainer extends Component {

  render() {
    const { movies } = this.props;
    return (
  
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
  const { lists } = state;
  const movie = _getMoviesInList(state, id);
  return { lists, movie };
}

function mapDispatchToProps(dispatch) {
  return {
    handler: path => dispatch(pushState(null, path)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieDetails);
