import React, { Component, PropTypes } from 'react';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';

export default class MovieDetailsHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
    maxFanartWidth: 800,
    fanartRatio: 1.78,
    resizeHandler: this._updateDimensions.bind(this) };
  }

  componentWillMount(){
    this._updateDimensions();
  }

  componentDidMount(){
    window.addEventListener("resize", this.state.resizeHandler);
  }

  componentWillUnmount(){
    window.removeEventListener("resize", this.state.resizeHandler);
  }

  _updateDimensions(){
    this.setState({ width: document.documentElement.clientWidth });
  }

  render() {
    const backWidth =  this.state.width > this.state.maxFanartWidth ? this.state.maxFanartWidth : this.state.width;
    const year = this.state.width > 350 ? this.props.movie.released.split('-')[0] : '';
    return (
        <CardMedia style={{
            height: backWidth / this.state.fanartRatio,
            backgroundImage: 'url(' + this.props.movie.images.fanart + ')',
            backgroundSize:"cover"}}
            overlay={
          <CardTitle style={{color: "white", fontSize: "1.5em"}}>
            {this.props.movie.title}
            <span style={{float: "right", marginRight: "2em"}}>{year}</span>
          </CardTitle> }
        />
    );
  }
}

MovieDetailsHeader.propTypes = {
  movie: PropTypes.object
};

MovieDetailsHeader.defaultProps = {
  movie: {
    "released": "1998-10-30",
    "title": "American History X",
    "images": {
      "poster": "https://walter.trakt.us/images/movies/000/000/043/posters/thumb/3943ed4449.jpg",
      "fanart": "https://walter.trakt.us/images/movies/000/000/043/fanarts/thumb/4144a111c1.jpg"
    }
  }
};
