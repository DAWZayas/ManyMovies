import React, { Component, PropTypes } from 'react';
const Card = require('material-ui/lib/card/card');
const CardMedia = require('material-ui/lib/card/card-media');
const CardText = require('material-ui/lib/card/card-text');
const CardTitle = require('material-ui/lib/card/card-title');
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

export default class MovieDetails extends Component {
  handleTouchStart(movie) {
    const { handler } = this.props;
    const slug = movie.slug;
    return function(){
      return handler('/movies/' + slug);
    };
  }

  render() {
    return (
      <Card style={{display: "flex", width: "100%", justifyContent: "space-between", margin: "0 auto"}} >
          <CardMedia overlay={
            <CardTitle style={{height: "80px", color: "white", fontSize: "24px"}}>
              Titulooooooooo
            <span style={{marginLeft: "40%"}}>
            <button className="post-collections-icon" > <i className="material-icons">collections_bookmark</i> </button>
            <button className="post-history-icon" > <i className="material-icons">history</i> </button>
            <button className="post-list-icon" > <i className="material-icons">playlist_add</i> </button>
            </span>
            </CardTitle> }>
            <img style={{opacity: "0.8"}} src="https://walter.trakt.us/images/movies/000/130/970/fanarts/thumb/58994fad62.jpg"/>
          </CardMedia>
          <CardMedia style={{display: "flex", width: "21%", marginLeft: "20px", marginTop: "-270px"}}>
            <img style={{border: "5px solid white"}} src="https://walter.trakt.us/images/movies/000/130/970/posters/thumb/baa71aa408.jpg"/>
          </CardMedia>
          <CardText style={{marginTop: "19%", height: "400px", fontSize: "22px"}}>
            Minions Stuart, Kevin and Bob are recruited by Scarlet Overkill, a super-villain who, alongside her inventor husband Herb, hatches a plot to take over the world.
          </CardText>
      </Card>
    );
  }
}

MovieDetails.propTypes = {
  movie: PropTypes.object,
  handler : PropTypes.func
};

MovieDetails.defaultProps = {
  movie: {}
};
