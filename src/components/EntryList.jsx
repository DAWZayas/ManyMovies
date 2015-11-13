import React, { Component, PropTypes } from 'react';
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

export default class ListDetails extends Component {
  render() {
    const { entries } = this.props;
    return (
      <div>
        {
          entries.map((entry, index) => <p key={index}>{entry}</p>)
        }
      </div>
    );
  }
}

ListDetails.propTypes = {
  entries: PropTypes.array
};

ListDetails.defaultProps = {
  entries: []
};
