import React, { Component, PropTypes } from 'react';
import defaultPosterSrc from '../../images/mm-poster.png';
import { connect } from 'react-redux';

export default class CoverImages extends Component {
  constructor(props) {
    super(props);
    this.state = {src: defaultPosterSrc};
    const img = new Image();
    img.onload = () => { this.setState({ src: img.src });};
    img.src = this.props.movie.images.poster;
  }
render() {
    const { movie } = this.props;
    return (
        <img src={this.state.src} alt={movie.title}/>
    );
}
}

CoverImages.propTypes = {
  idList: PropTypes.string,
  movie: PropTypes.object,
  navigate: PropTypes.func
};

CoverImages.defaultProps = {
  movie: {}
};

const mapStateToProps = () => ({});

export default connect(
  mapStateToProps
)(CoverImages);
