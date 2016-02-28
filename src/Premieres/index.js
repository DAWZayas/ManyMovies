import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { registerListeners, unregisterListeners } from './listeners';
import { addEntry, removeEntry } from '../Lists/side-actions';
import Premieres from './Premieres';

function mapStateToProps(state) {
  const { movies, auth, wishedMovies } = state;
  return {
    premieres: movies, auth, wishedMovies
  };
}

function mapDispatchToProps(dispatch) {
  return {
    navigate: path => dispatch(pushState(null, path)),
    registerListeners: (page, auth) => registerListeners(dispatch, page, auth),
    unregisterListeners: auth => unregisterListeners(dispatch, auth),
    addEntry: (idCollection, idEntry, idUser) => addEntry(idCollection, idEntry, idUser),
    removeEntry: (idCollection, idEntry, idUser) => removeEntry(idCollection, idEntry, idUser)

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Premieres);
