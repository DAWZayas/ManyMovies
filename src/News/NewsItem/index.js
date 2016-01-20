import { connect } from 'react-redux';
import { registerListeners, unregisterListeners } from './listeners';
import NewsItem from './NewsItem';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    registerListeners: id => registerListeners(dispatch, id),
    unregisterListeners: id => unregisterListeners(id)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsItem);
