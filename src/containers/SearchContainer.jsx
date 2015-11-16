import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import Searcher from '../components/Searcher';
import _ from 'lodash';

function mapStateToProps(state) {
  const search = _.values(state.search);
    return {
    search: search
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handler: path => dispatch(pushState(null, path)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Searcher);
