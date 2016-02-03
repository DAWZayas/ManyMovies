import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { registerListeners, unregisterListeners } from './listeners';
import { updateAllMovies, addMovie } from './side-actions';
import Admin from './Admin/';

const mapStateToProps = state => {
  const { movies, updatedMovies } = state;
  return {
    user: state.users.Gotre,
    movies,
    updatedMovies
  };
};

function mapDispatchToProps(dispatch) {
  return {
    navigate: path => dispatch(pushState(null, path)),
    registerListeners: () => registerListeners(dispatch),
    unregisterListeners: () => unregisterListeners(dispatch),
    updateAllMovies: movies => updateAllMovies(movies, dispatch),
    addMovie: (id, movie) => addMovie(id, movie, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin);
