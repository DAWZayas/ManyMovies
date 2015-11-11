import { connect } from 'react-redux';
import Lists from '../components/Lists';

function mapStateToProps(state) {
  return {
    lists: state.lists
  };
}

export default connect(
  mapStateToProps
)(Lists);
