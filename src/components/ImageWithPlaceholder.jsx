import React, { Component, PropTypes } from 'react';

export default class ImageWithPlaceholder extends Component {
  constructor(props) {
    super(props);
    const image = new Image();
    this.state = {src: props.placeholderSrc, image };
    image.onload = () => {
      this.setState({ src: image.src });
      image.onload = null;
    };
    image.src = props.src;
  }

  componentWillUnmount(){
    const { image } = this.state;
    image.onload = null;
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
