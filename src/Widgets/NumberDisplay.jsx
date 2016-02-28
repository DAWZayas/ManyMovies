import React, { Component, PropTypes } from 'react';

export default class NumberDisplay extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const { number, label } = this.props;
    const calculatedLabel = number !== 1 ? `${label}s` : label;

    return (
        <div>
          <span>{number}</span>
          <div className="smalltext">{calculatedLabel}</div>
        </div>
    );
  }
}

NumberDisplay.propTypes = {
  number: PropTypes.number,
  label: PropTypes.string
};
