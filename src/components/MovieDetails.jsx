import React, { Component, PropTypes } from 'react';
import Card from 'material-ui/lib/card/card';
import CardMedia from'material-ui/lib/card/card-media';
import CardText from 'material-ui/lib/card/card-text';
import CardTitle from 'material-ui/lib/card/card-title';
import MenuItem from 'material-ui/lib/menus/menu-item';
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
      <div>
      <Card style={{width: "100%", justifyContent: "space-between", margin: "0 auto"}} >
          <CardMedia overlay={
            <CardTitle style={{height: "80px", color: "white", fontSize: "24px"}}>
              Titulooooooooo
            </CardTitle> }>
            <img style={{opacity: "0.8"}} src="https://walter.trakt.us/images/movies/000/130/970/fanarts/thumb/58994fad62.jpg"/>
          </CardMedia>
          <CardText>
          <div style={{float: "left"}}>
            <li> <img style={{border: "2px solid #727272", float:"left", height: "13em", marginRight: "2em"}} src="https://walter.trakt.us/images/movies/000/130/970/posters/thumb/baa71aa408.jpg"/> </li>
            <li> <span style={{color: "#F44336"}}>Released: </span> 2015-07-10 </li>
            <li> <span style={{color: "#F44336"}}>Runtime: </span> 91 </li>
            <li> <span style={{color: "#F44336"}}>Genres: </span> adventure, animation, comedy, family </li>
            </div>
          </CardText>
          <CardText style={{margin: "1em", fontSize: "1em", float: "left"}}>
           bbbbbb jhhhhhh ujjjjj hhhhkkkkkk ooooooo ooooooo uuuuuuuuuuuuuuu i i i i iiiiiiiiiiiiiiiii hgbhjdsbhhhhhhhhhhhhhhhhhhhhhhhhhhhhhMinions Stuart, Kevin and Bob are recruited by Scarlet Overkill, a super-villain who, alongside her inventor husband Herb, hatches a plot to take over the world.
          </CardText>
      </Card>
      <div>
        <MenuItem style={{color: "#512DA8", border: "2px solid #512DA8", marginBottom: "1%" }} primaryText="ADD TO HISTORY" />
        <MenuItem style={{color: "#00796B", border: "2px solid #00796B", marginBottom: "1%"}} primaryText="ADD TO COLLECTION"/>
        <MenuItem style={{color: "#F44336", border: "2PX solid #F44336"}} primaryText="ADD TO LIST" />
      </div>
      </div>
    );
  }
}

//<img style={{border: "5px solid black", float:"left"}} src="https://walter.trakt.us/images/movies/000/130/970/posters/thumb/baa71aa408.jpg"/>
MovieDetails.propTypes = {
  movie: PropTypes.object,
  handler : PropTypes.func
};

MovieDetails.defaultProps = {
  movie: {}
};
