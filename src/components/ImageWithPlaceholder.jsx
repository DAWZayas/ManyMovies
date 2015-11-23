import React, { Component, PropTypes } from 'react';
import injectTapEventPlugin from "react-tap-event-plugin";
import defaultPosterSrc from '../../images/mm-poster.png';
injectTapEventPlugin();

export default class ImageWithPlaceholder extends Component {
  constructor(props) {
    super(props);
    this.state = {src: defaultPosterSrc};
    const img = new Image();
    img.onload = () => {
      this.setState({ src: img.src });
      img.onload = null;
    };
  }
  render(){
    const {movie} = this.props;
    return(
      <img src={this.state.src} alt={movie.title}/>
    );
  }
}

ImageWithPlaceholder.propTypes = {
  movie: PropTypes.object,
  src: PropTypes.object,
  style: PropTypes.object
};

ImageWithPlaceholder.defaultProps = {
    movie: {
    "title": "American History X",
    "images": {
      "poster": "https://walter.trakt.us/images/movies/000/000/043/posters/thumb/3943ed4449.jpg",
      "fanart": "https://walter.trakt.us/images/movies/000/000/043/fanarts/thumb/4144a111c1.jpg"
    }
  }
};
