import React, { Component, PropTypes } from 'react';
import Colors from 'material-ui/lib/styles/colors';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentRefresh from 'material-ui/lib/svg-icons/navigation/refresh';
import RefreshingIcon from 'material-ui/lib/svg-icons/action/history';
import DoneIcon from 'material-ui/lib/svg-icons/action/done-all';
import LinearProgress from 'material-ui/lib/linear-progress';
import CardText from 'material-ui/lib/card/card-text';
import Card from 'material-ui/lib/card/card';
import MovieSearcher from './MovieSearcher/MovieSearcher';
import ScrollTop from '../../Widgets/ScrollTop';
import { once } from 'lodash';

const iconStyles = {margin: '-1em 0 1em 0'};

export default class Admin extends Component {

  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  componentWillMount(){
    this.props.registerListeners();
  }

  componentWillReceiveProps() {
    this.setState({ loading: false });
  }

  componentWillUnmount(){
    this.props.unregisterListeners();
  }

  _handleTouchTap(){
    this.props.updateAllMovies(this.props.movies);
  }

  _getLoaderButton(loading, updatedMovies){
    if (!loading && updatedMovies === 0){
      return (
        <FloatingActionButton
          style={iconStyles}
          backgroundColor={ Colors.deepOrange900 }
          onTouchTap={once(this._handleTouchTap.bind(this))}
          >
          <ContentRefresh />
        </FloatingActionButton>
      );
    }
    return null;
  }

  _getRefreshingButton(loading, updatedMovies, max){
    if (!loading && (updatedMovies !== max) && (updatedMovies !== 0)) {
      return (
        <FloatingActionButton disabled disabledColor={Colors.grey300} style={iconStyles}>
          <RefreshingIcon />
        </FloatingActionButton>
      );
    }
    return null;
  }

  _getDoneButton(loading, updatedMovies, max){
    if (!loading && updatedMovies === max) {
      return (
        <FloatingActionButton disabled style={iconStyles} disabledColor={Colors.green600}>
          <DoneIcon />
        </FloatingActionButton>
      );
    }
    return null;
  }

  render() {
    const { updatedMovies, movies, addMovie } = this.props;
    const { loading } = this.state;
    const max = Object.keys(movies).length;
    const refreshing = max !== 0;
    const progressNumbers = refreshing ? <p>{updatedMovies} / {max}</p> : null;
    return (
      <span>
        <Card style={{margin: '1em'}}>
          <CardText style={{textAlign: 'center'}}>
            <p>Refresh the data of the movies in Firebase.</p>
            {progressNumbers}
            <hr/>
            <LinearProgress
              color={Colors.deepOrange800}
              mode={ loading ? "indeterminate" : "determinate" }
              value={updatedMovies}
              max={max}
              />
            <hr/>
            {this._getLoaderButton.bind(this)(loading, updatedMovies)}
            {this._getRefreshingButton(loading, updatedMovies, max)}
            {this._getDoneButton(loading, updatedMovies, max)}
          </CardText>
        </Card>
        <MovieSearcher movies={movies} addMovie={addMovie}/>
        <ScrollTop/>
      </span>
    );
  }
}

Admin.propTypes = {
  movies: PropTypes.object,
  updateAllMovies: PropTypes.func,
  updatedMovies: PropTypes.number,
  registerListeners: PropTypes.func,
  unregisterListeners: PropTypes.func,
  addMovie: PropTypes.func
};
