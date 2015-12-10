import React, { Component, PropTypes } from 'react';

export default class ImageWithPlaceholder extends Component {
  constructor(props) {
    super(props);
    this.state = {src: props.placeholderSrc};
    const img = new Image();
    img.onload = () => {
      this.setState({ src: img.src });
      img.onload = null;
    };
    img.src = props.src;
  }

  render(){
    return(
      <img style={this.props.style} src={this.state.src} alt={this.props.alt}/>
    );
  }
}

ImageWithPlaceholder.propTypes = {
  placeholderSrc: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
  style: PropTypes.object
};

ImageWithPlaceholder.defaultProps = {
};
