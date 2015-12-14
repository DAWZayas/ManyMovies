import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import Premieres from '../components/Premieres';
import _ from 'lodash';

function mapStateToProps(state) {
  const { movies, lists, entries } = state;
  const today = new Date().getTime();
  const premieres = _.sortBy(_.filter(movies, movie => Date.parse(movie.released) > today), 'released');
  const watchlist = _.filter(_.values(lists), list => list.slug === 'watchlist')[0];
  const watchlistEntries = entries[watchlist.id];
  return {
    premieres,
    watchlistEntries
  };
}

function mapDispatchToProps(dispatch) {
  return {
    navigate: path => dispatch(pushState(null, path)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Premieres);
