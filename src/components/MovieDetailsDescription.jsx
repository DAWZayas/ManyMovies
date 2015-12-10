import React, { PropTypes, Component } from 'react';
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import Color from 'material-ui/lib/styles/colors';
import Paper from'material-ui/lib/paper';
import MovieDetailsHeader from './MovieDetailsHeader';
import ImageWithPlaceholder from './ImageWithPlaceholder';

export default class MovieDetailsDescription extends Component{
  constructor(props) {
    super(props);
    this.state = {
    maxFanartWidth: 1100,
    fanartRatio: 1.78
    };
  }
  render(){
    return(
      <Card >
          <MovieDetailsHeader />
          <CardText style={{display: "flex", width: "100%", margin: "0 auto"}}>
            <Paper> <ImageWithPlaceholder src={this.props.movie.images.poster} alt={this.props.movie.title} style={{height: "21em"}} /> </Paper>
            <div>
            <CardText> <span style={{color: Color.red500}}>Released: </span> {this.props.movie.released} </CardText>
            <CardText> <span style={{color: Color.red500}}>Runtime: </span> {this.props.movie.runtime} </CardText>
            <CardText> <span style={{color: Color.red500}}>Genres: </span> {this.props.movie.genres} </CardText>
            <CardText> <span style={{color: Color.red500}}>Certification: </span> {this.props.movie.certification} </CardText>
            <CardText> <a href={this.props.movie.trailer}><i className="material-icons">movie</i>Trailer</a> </CardText>
            </div>
          </CardText>
          <CardText style={{padding: "1em", fontSize: "1em", clear: "left"}}>
            {this.props.movie.sinopsis}
            </CardText>
      </Card>
);
}
}

MovieDetailsDescription.propTypes = {
  movie: PropTypes.object,
};

MovieDetailsDescription.defaultProps = {
  movie: {
    "title": "American History X",
    "released": "1998-10-30",
    "ids": {
      "trakt": 43,
      "slug": "american-history-x-1998",
      "imdb": "tt0120586",
      "tmdb": 73
    },
    "sinopsis": "Derek Vineyard is paroled after serving 3 years in prison for killing two thugs who tried to break into/steal his truck. Through his brother, Danny Vineyard's narration, we learn that before going to prison, Derek was a skinhead and the leader of a violent white supremacist gang that committed acts of racial crime throughout L.A. and his actions greatly influenced Danny. Reformed and fresh out of prison, Derek severs contact with the gang and becomes determined to keep Danny from going down the same violent path as he did.",
    "runtime": 119,
    "votes": 7659,
    "rating": 8.70296,
    "genres": [
      "drama"
    ],
    "certification": "R",
    "tagline": "Some Legacies Must End.",
    "trailer": "http://youtube.com/watch?v=JsPW6Fj3BUI",
    "images": {
      "poster": "https://walter.trakt.us/images/movies/000/000/043/posters/thumb/3943ed4449.jpg",
      "fanart": "https://walter.trakt.us/images/movies/000/000/043/fanarts/thumb/4144a111c1.jpg"
    }
  },
  likes: {likes:100, dislikes:20 },
  userLikes: -1,
  listedIn: ['1', '2', '3']
};
