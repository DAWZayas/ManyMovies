import React, { Component, PropTypes } from 'react';
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

export default class MovieGrid extends Component {
  render() {
    const { entry } = this.props;
    return (
      <p>{entry}</p>
    );
  }
}

MovieGrid.propTypes = {
  entry: PropTypes.string
};

MovieGrid.defaultProps = {
  entry: ''
};
