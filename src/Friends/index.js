import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { viewProfile } from './side-actions';
import Friends from './Friends';

function mapStateToProps(state) {

}

function mapDispatchToProps(dispatch) {
  return {
		navigate: path => dispatch(pushState(null, path)),
    viewProfile: () => viewProfile(dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Friends);
