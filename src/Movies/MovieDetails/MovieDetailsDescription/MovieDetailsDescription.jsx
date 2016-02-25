import React, { PropTypes, Component } from 'react';
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import Dialog from 'material-ui/lib/dialog';
import Popover from 'material-ui/lib/popover/popover';
import FontIcon from 'material-ui/lib/font-icon';
import Rating from 'react-rating';
import { isEmpty, capitalize } from 'lodash';
import Color from 'material-ui/lib/styles/colors';
import MovieDetailsHeader from '../MovieDetailsHeader';
import ImageWithPlaceholder from '../../../Widgets/ImageWithPlaceholder';
import FlipClock from '../../../Widgets/FlipClock';
import defaultPoster from '../../../../images/mm-poster.png';


export default class MovieDetailsDescription extends Component{
  constructor(props) {
    super(props);
    this.state = {
      watchingTrailer: false,
      resizeHandler: this._updateDimensions.bind(this)
    };
  }

  componentWillMount(){
    if (!isEmpty(this.props.user)){
      this.props.registerListeners(this.props.idMovie, this.props.user.userName);
    }
    this._updateDimensions();
  }

  componentDidMount(){
    window.addEventListener("resize", this.state.resizeHandler);
  }

  componentWillUnmount(){
    window.removeEventListener("resize", this.state.resizeHandler);
    if (!isEmpty(this.props.user)){
      this.props.unregisterListeners(this.props.idMovie, this.props.user.userName);
    }
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

  _showPopover() {
    this.setState({
      activePopover: true
    });
  }

  _hidePopover(){
    this.setState({activePopover: false});
  }

  _ratingHandler(userName, idMovie, rate){
    const { userRating, rateMovie, changeMovieRating } = this.props;
    if (userRating === null){
      rateMovie(userName, idMovie, rate);
    }else {
      changeMovieRating(userName, idMovie, rate);
    }
    this._hidePopover.bind(this)();
  }

  _getPopover(){
    const { movie, user, userRating } = this.props;
    const id = movie.ids.trakt;

    const popover = (
      <Popover
        style={{width: '250px', padding: '0 2em', textAlign: 'center'}}
        anchorEl={this.refs.anchorEl}
        anchorOrigin={{"horizontal":"middle", "vertical":"bottom"}}
        targetOrigin={{"horizontal":"middle", "vertical":"center"}}
        open={this.state.activePopover}
        onRequestClose={this._hidePopover.bind(this)}
        >
          <Rating
            iconClassName="ratings"
            empty="fa fa-heart-o fa-2x heart"
            full="fa fa-heart fa-2x heart"
            initialRate={this._convertRateToHearts(userRating)}
            stop={5}
            step={1}
            onChange={rate => { this._ratingHandler(user.userName, id, this._convertRate(rate));}}/>
      </Popover>
    );
    return popover;
  }

  _getRatingText(){
    const { userRating } = this.props;
    const ratings = {
      0: '1 - TERRIBLE',
      2.5: '2 - BAD',
      5: '3 - MEH',
      7.5: '4 - GOOD',
      10: '5 - AWESOME'
    };
    return ratings[userRating] || 'RATE';
  }

  _convertRateToHearts(rating){
    return rating / 2.5 + 1;
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
          <FontIcon onClick={this._handleShowTrailer.bind(this)} style={{cursor: 'pointer'}} color={Color.indigo500} className="material-icons">movie</FontIcon>
          <span onClick={this._handleShowTrailer.bind(this)} style={{marginLeft: '0.5em', color: Color.indigo500, cursor: 'pointer'}}>Trailer</span>
        </div>
      </div>);
  }

  _getPGRating(){
    const { movie } = this.props;
    return movie.certification ? <p><span style={{color: Color.red500}}>Certification: </span><span style={this._getPGStyle(movie.certification)}>{movie.certification}</span></p> : null;
  }

  _getPGStyle(certification){
    const pgColors = {
      'PG': Color.green500,
      'PG-13': Color.orange500,
      'R': Color.red500
    };
    const pgColor = pgColors[certification] || Color.blue500;
    return {
      color: pgColor,
      fontWeight: 'bold',
      fontSize: '0.75em',
      border: `2px solid ${pgColor}`,
      padding: '0.2em'
    };
  }

  _getReleased(){
    const { movie } = this.props;
    const releaseDate = new Date(Date.parse(movie.released));
    const formatedReleased = releaseDate.toLocaleDateString('en-GB').replace(/\//g, '-');
    if (Date.parse(movie.released) <= Date.now()){
      return <p><span style={{color: Color.red500}}>Released: </span> {formatedReleased}</p>;
    }else {
      return (
      <div>
        <h3 style={{textAlign: 'center', color: Color.red500}}>Movie release: <span style={{ color: Color.grey500 }}>{formatedReleased}</span></h3>
        <FlipClock date={movie.released}/>
      </div>
      );
    }
  }


  _getRuntime(){
    const { movie } = this.props;
    return movie.runtime ? <p><span style={{color: Color.red500}}>Runtime: </span> {movie.runtime}</p> : null;
  }

  _getGenres(){
    const { movie } = this.props;
    if (movie.genres) {
      const genres = movie.genres.map(genre => capitalize(genre));
      return (
        <p>
          <span style={{color: Color.red500}}>Genres: </span>
          <span>
          {
            genres.join(', ')
          }
          </span>
        </p>
      );
    }else {
      return null;
    }
  }

  render(){
    const { movie, user } = this.props;
    const voteCount = movie.votes === 0 ? 'No votes' : movie.votes === 1 ? ' 1 vote' : movie.votes + ' votes';
    const percentRating = movie.votes === 0 ? '' : `${Math.round(movie.totalRating * 10 / movie.votes)} %`;
    const ratingWrap = isEmpty(user) ?
      null
      :
      (<div className="ratings-wrapper">
        <FontIcon onClick={this._showPopover.bind(this)} style={{cursor: 'pointer'}} color={Color.red500} className="material-icons">favorite_border</FontIcon>
        <span  ref="anchorEl" onClick={this._showPopover.bind(this)} style={{marginLeft: '0.5em', cursor: 'pointer'}}>{this._getRatingText.bind(this)()}</span>
      </div>);

    return(
      <Card>
          <MovieDetailsHeader movie={movie} />
          <CardText>
            <div className="movie-description-header">
              <ImageWithPlaceholder
                placeholderSrc={defaultPoster}
                src={this.props.movie.images.poster}
                alt={this.props.movie.title}
                style={{width: '10em', marginRight: '0.5em', float: 'left'}}
              />
              <div className="ratings-wrapper">
                <FontIcon color={Color.red500} className="material-icons">favorite</FontIcon>
                <span style={{marginLeft: '0.5em'}}>{percentRating} <small style={{marginLeft: '2em'}}>{voteCount}</small></span>
              </div>
              <hr/>
              <p style={{fontStyle: "italic"}}>{movie.tagline}</p>
              { ratingWrap }
              {this._getPopover.bind(this)()}
              {this._getTrailer.bind(this)()}
              <br style={{clear: 'both'}}/>
            </div>
          </CardText>
          <CardText>
            {this._getReleased.bind(this)()}
            {this._getGenres.bind(this)()}
            {this._getRuntime.bind(this)()}
            {this._getPGRating.bind(this)()}
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
  rateMovie: PropTypes.func,
  user: PropTypes.object,
  userRating: PropTypes.number,
  changeMovieRating: PropTypes.func,
  registerListeners: PropTypes.func,
  unregisterListeners: PropTypes.func,
  idMovie: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

MovieDetailsDescription.defaultProps = {

};
