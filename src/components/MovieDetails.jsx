import React, { Component, PropTypes } from 'react';
const Card = require('material-ui/lib/card/card');
const CardMedia = require('material-ui/lib/card/card-media');
const CardText = require('material-ui/lib/card/card-text');
const CardTitle = require('material-ui/lib/card/card-title');
const CardActions = require('material-ui/lib/card/card-actions');
const FlatButton = require('material-ui/lib/flat-button');

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
      <Card style={{width: "100%", justifyContent: "space-between", margin: "0 auto"}} >
          <CardMedia overlay={
            <CardTitle style={{height: "80px", color: "white", fontSize: "24px"}}>
              Titulooooooooo
            </CardTitle> }>
            <img style={{opacity: "0.8"}} src="https://walter.trakt.us/images/movies/000/130/970/fanarts/thumb/58994fad62.jpg"/>
          </CardMedia>
          <CardMedia style={{display: "flex", width: "21%", marginLeft: "20px", marginTop: "-270px"}}>
            <img style={{border: "5px solid white"}} src="https://walter.trakt.us/images/movies/000/130/970/posters/thumb/baa71aa408.jpg"/>
          </CardMedia>
          <CardText style={{marginTop: "19%", height: "400px", fontSize: "22px"}}>
           bbbbbb jhhhhhh ujjjjj hhhhkkkkkk ooooooo ooooooo uuuuuuuuuuuuuuu i i i i iiiiiiiiiiiiiiiii hgbhjdsbhhhhhhhhhhhhhhhhhhhhhhhhhhhhhMinions Stuart, Kevin and Bob are recruited by Scarlet Overkill, a super-villain who, alongside her inventor husband Herb, hatches a plot to take over the world.
             <CardActions style={{marginLeft: "30%", marginTop: "3%"}}>
             <div> <FlatButton labelStyle={{color: "#512DA8", border: "2px solid #512DA8"}} hoverColor="none" rippleColor="#512DA8" style={{fontColor: "red"}} label="ADD TO HISTORY"/> </div>
             <div> <FlatButton labelStyle={{color: "#00796B", border: "2px solid #00796B"}} hoverColor="none" rippleColor="#00796B" label="ADD TO COLLECTION"/> </div>
             <div> <FlatButton labelStyle={{color: "#F44336", border: "2px solid #F44336"}} hoverColor="none" rippleColor="#F44336" label="ADD TO LIST"/> </div>
            </CardActions>
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
