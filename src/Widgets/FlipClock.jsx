import React, { Component, PropTypes } from 'react';
import NumberDisplay from './NumberDisplay';

export default class FlipClock extends Component {
  constructor(props){
    super(props);
    this.state = {
      remainingTime: this._getTimeRemaining.bind(this)(),
      interval: setInterval(() => {this._setRemainingTime();}, 950)
    };
  }

  componentWillUnmount(){
    clearInterval(this.state.interval);
  }

  _setRemainingTime(){
    this.setState({
      remainingTime: this._getTimeRemaining.bind(this)()
    });
  }

  _getTimeRemaining(){
    const { date } = this.props;
    const t = Date.parse(date) - Date.now();
    const seconds = Math.floor((t / 1000) % 60 );
    const minutes = Math.floor((t / 1000 / 60) % 60 );
    const hours = Math.floor((t / ( 1000 * 60 * 60)) % 24 );
    const days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      'Day': days,
      'Hour': hours,
      'Minute': minutes,
      'Second': seconds
    };
  }

  render() {
    const { remainingTime } = this.state;
    const labels = ['Day', 'Hour', 'Minute', 'Second'];

    return (
        <div className="countdown-clock">
          {
            labels.map(label => <NumberDisplay key={label} label={label} number={remainingTime[label]}/>)
          }
        </div>
    );
  }
}

FlipClock.propTypes = {
  date: PropTypes.string,
};
