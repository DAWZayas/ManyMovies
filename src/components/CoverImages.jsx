import { Component, PropTypes } from 'react';
import injectTapEventPlugin from "react-tap-event-plugin";
import defaultPosterSrc from '../../images/mm-poster.png';
import { connect } from 'react-redux';
injectTapEventPlugin();

export default class CoverImages extends Component {
  constructor(props) {
    super(props);
    this.state = {src: defaultPosterSrc};
    const img = new Image();
    img.onload = () => {
      this.setState({ src: img.src });
      img.onload = null;
    };
    img.src = this.props.movie.images.poster;
  }
  render(){
    const { movie } = this.props;
    return(
      <img src={this.state.src} alt={movie.title}/>
    );
  }
}

CoverImages.propTypes = {
  movie: PropTypes.object
};

CoverImages.defaultProps = {
  movie: {}
};

function mapStateToProps(state) {
  const { movie } = state;
  return {
    movie
  };
}

export default connect(
  mapStateToProps,
)(CoverImages);

