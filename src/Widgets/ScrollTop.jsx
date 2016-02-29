import React, { Component, PropTypes } from 'react';
import FontIcon from 'material-ui/lib/font-icon';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import Colors from 'material-ui/lib/styles/colors';
import scrollTo from 'scroll-to';

export default class ScrollTop extends Component {

  constructor(props) {
    super(props);
    this.state = {
      active: false,
      scrollHandler: this._scrollHandler.bind(this)
    };
  }

  componentDidMount(){
    window.addEventListener("scroll", this.state.scrollHandler);
  }

  componentWillUnmount(){
    window.removeEventListener("scroll", this.state.scrollHandler);
  }

  _scrollHandler(){
    const { show } = this.props;
    if (window.scrollY >= show) {
      this.setState({active: true});
      return;
    }
    this.setState({active: false});
  }

  render() {
    const style = this.state.active ? this.props.style : {display: 'none'};
    const { ease, duration, top } = this.props;
    return (
      <div
        style={style}
        onTouchTap={(e) => {e.stopPropagation(); scrollTo(0, top, {ease, duration});}}
      >
        <FloatingActionButton backgroundColor={Colors.orange600}>
          <FontIcon className="material-icons">arrow_upward</FontIcon>
        </FloatingActionButton>
      </div>
    );
  }
}

ScrollTop.propTypes = {
  ease: PropTypes.string,
  style: PropTypes.object,
  duration: PropTypes.number,
  show: PropTypes.number,
  top: PropTypes.number
};

ScrollTop.defaultProps = {
  style: {
    position: 'fixed',
    bottom: 50,
    right: 30,
    cursor: 'pointer',
    transitionDuration: '0.2s',
    transitionTimingFunction: 'linear',
    transitionDelay: '0s'
  },
  duration: 500,
  ease: 'out-circ',
  show: 300,
  top: 0
};
