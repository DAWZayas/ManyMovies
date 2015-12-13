import { connect } from 'react-redux';
import MovieDetails from '../components/MovieDetails';
import _ from 'lodash';

function mapStateToProps(state) {
  const slug = state.router.params.movieSlug;
  const { movies } = state;
  const id = _.findKey(movies, movie => movie.ids.slug === slug);
  const movie = movies[id];
  const comments = state.comments[id] || [];
  return {
    movie,
    idCommented: id,
    comments
  };
}

export default connect(
  mapStateToProps
)(MovieDetails);
