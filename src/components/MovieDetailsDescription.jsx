import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { rateMovie, changeMovieRating } from '../actions';
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
const Dialog = require('material-ui/lib/dialog');
import Popover from 'material-ui/lib/popover/popover';
import FontIcon from 'material-ui/lib/font-icon';
import Rating from 'react-rating';
import Color from 'material-ui/lib/styles/colors';
import MovieDetailsHeader from './MovieDetailsHeader';
import ImageWithPlaceholder from './ImageWithPlaceholder';

export default class MovieDetailsDescription extends Component{
  constructor(props) {
    super(props);
    this.state = {
      watchingTrailer: false,
      resizeHandler: this._updateDimensions.bind(this)
    };
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
    this.setState({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
     });
  }

  _handleShowTrailer(){
    this.setState({watchingTrailer: true});
  }

  _handleHideTrailer(){
    this.setState({watchingTrailer: false});
  }

  _showPopover(e) {
    this.setState({
      activePopover: true,
      anchorEl:e.currentTarget,
    });
  }

  _hidePopover(){
    this.setState({activePopover: false});
  }

  _ratingHandler(userName, idMovie, rate){
    const { userRating, rateMovie, changeMovieRating } = this.props;
    if (userRating === undefined){
      rateMovie(userName, idMovie, rate);
    }else {
      changeMovieRating(userName, idMovie,  userRating, rate);
    }
  }

  _getPopover(){
    const { movie, user } = this.props;
    const id = movie.ids.trakt;

    const popover = (
      <Popover
        style={{width: '250px', padding: '0 2em', textAlign: 'center'}}
        anchorEl={this.state.anchorEl}
        anchorOrigin={{"horizontal":"middle", "vertical":"center"}}
        targetOrigin={{"horizontal":"middle", "vertical":"center"}}
        open={this.state.activePopover}
        onRequestClose={this._hidePopover.bind(this)}
        >
          <Rating
            iconClassName="ratings"
            empty="fa fa-heart-o fa-2x heart"
            full="fa fa-heart fa-2x heart"
            stop={5}
            step={1}
            onChange={rate => { this._ratingHandler(user.userName, id, this._convertRate(rate));}}/>
      </Popover>
    );
    return popover;
  }

  _getRatingText(){
    const { userRating } = this.props;
    switch (userRating){
      case 0:
        return '1 - TERRIBLE';
      case 2.5:
        return '2 - BAD';
      case 5:
        return '3 - MEH';
      case 7.5:
        return '4 - GOOD';
      case 10:
        return '5 - AWESOME';
      default:
        return 'RATE';
    }
  }

  _convertRate(num){
    return (num - 1) * 2.5;
  }

  _getTrailer(){
    const { movie } = this.props;
    if (!movie.trailer){
      return null;
    }
    const trailerId = movie.trailer.split('watch?v=')[1];
    const dialogWidth = (this.state.height > this.state.width) ? '100%' : '50%';
    return (
      <div>
        <Dialog
          style={{textAlign: 'center'}}
          contentStyle={{width: dialogWidth}}
          open={this.state.watchingTrailer}
          onRequestClose={this._handleHideTrailer.bind(this)}
          autoScrollBodyContent
          >
          <div className="embed-container">
            <iframe
              id="ytplayer"
              type="text/html"
              src={`http://www.youtube.com/embed/${trailerId}?autoplay=1`}
              frameBorder="0"
            />
          </div>
        </Dialog>
        <div className="ratings-wrapper">
          <FontIcon color={Color.indigo500} className="material-icons">movie</FontIcon>
          <span onClick={this._handleShowTrailer.bind(this)} style={{marginLeft: '0.5em', color: Color.indigo500}}>Trailer</span>
        </div>
      </div>);
  }

  render(){
    const { movie } = this.props;
    const percentRating = movie.totalRating === 0 ? '0 %' : `${Math.round(movie.totalRating * 10 / movie.votes)} %`;
    return(
      <Card>
          <MovieDetailsHeader movie={movie} />
          <CardText>
            <div className="movie-description-header">
              <ImageWithPlaceholder src={this.props.movie.images.poster} alt={this.props.movie.title} style={{width: '10em', marginRight: '0.5em', float: 'left'}} />
              <div className="ratings-wrapper">
                <FontIcon color={Color.red500} className="material-icons">favorite</FontIcon>
                <span style={{marginLeft: '0.5em'}}>{percentRating}</span>
              </div>
              <div className="ratings-wrapper">
                <FontIcon color={Color.red500} className="material-icons">favorite_border</FontIcon>
                <span onClick={this._showPopover.bind(this)} style={{marginLeft: '0.5em'}}>{this._getRatingText.bind(this)()}</span>
              </div>
              <p style={{fontStyle: "italic"}}>{movie.tagline}</p>
              {this._getPopover.bind(this)()}
              {this._getTrailer.bind(this)()}
              <br style={{clear: 'both'}}/>
            </div>
          </CardText>
          <CardText> <span style={{color: Color.red500}}>Released: </span> {this.props.movie.released} </CardText>
          <CardText> <span style={{color: Color.red500}}>Runtime: </span> {this.props.movie.runtime} </CardText>
          <CardText> <span style={{color: Color.red500}}>Genres: </span> {this.props.movie.genres} </CardText>
          <CardText> <span style={{color: Color.red500}}>Certification: </span> {this.props.movie.certification} </CardText>
          <CardText style={{padding: "1em", fontSize: "1em", clear: "left"}}>
            {this.props.movie.sinopsis}
          </CardText>
      </Card>
    );
  }
}

MovieDetailsDescription.propTypes = {
  movie: PropTypes.object,
  rateMovie: PropTypes.func,
  user: PropTypes.object,
  userRating: PropTypes.number,
  changeMovieRating: PropTypes.func
};

MovieDetailsDescription.defaultProps = {

};

function mapStateToProps(state, ownProps) {
  const user = state.users.Gotre;
  const userRatings = state.userRatings[user.userName] || [];
  const idMovie = ownProps.movie.ids.trakt;
  const userRating = userRatings[idMovie];
  return { userRating, user };
}

function mapDispatchToProps(dispatch) {
  return {
    rateMovie: (userName, idMovie, rating) => dispatch(rateMovie(userName, idMovie, rating)),
    changeMovieRating: (userName, idMovie, oldVote, newVote) => dispatch(changeMovieRating(userName, idMovie, newVote, oldVote))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieDetailsDescription);
