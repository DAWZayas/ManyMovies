import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import App from './App';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const mapStateToProps = () => ({});

function mapDispatchToProps(dispatch) {
  return {
    navigate: path => dispatch(pushState(null, path))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
