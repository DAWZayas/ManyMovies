import React, { Component, PropTypes } from 'react';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';

export default class MovieDetailsHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
    maxFanartWidth: 1100,
    fanartRatio: 1.78
    };
  }

  render() {
    const backWidth =  document.documentElement.clientWidth > this.state.maxFanartWidth ? this.state.maxFanartWidth : document.documentElement.clientWidth;
    return (
        <CardMedia overlay={
          <CardTitle style={{height: "3em", color: "white", fontSize: "1.5em"}}>
            {this.props.movie.title}
          </CardTitle> }>
          <div style={{
            height: backWidth / this.state.fanartRatio,
            textAlign:"center",
            backgroundImage: 'url(' + this.props.movie.images.fanart + ')',
            backgroundSize:"cover"}}/>
        </CardMedia>
    );
  }
}

MovieDetailsHeader.propTypes = {
  movie: PropTypes.object
};

MovieDetailsHeader.defaultProps = {
  movie: {
    "title": "American History X",
    "images": {
      "poster": "https://walter.trakt.us/images/movies/000/000/043/posters/thumb/3943ed4449.jpg",
      "fanart": "https://walter.trakt.us/images/movies/000/000/043/fanarts/thumb/4144a111c1.jpg"
    }
  }
};
