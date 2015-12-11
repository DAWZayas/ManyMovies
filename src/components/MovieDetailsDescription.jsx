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
    const { movie } = this.props;
    return(
      <Card >
          <MovieDetailsHeader movie={movie} />
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

};
