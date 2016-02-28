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
import { once, isEmpty } from 'lodash';

const styles = {
  icon: { margin: '-1em 0 1em 0' },
  cardText: { textAlign: 'center' },
  card: { margin: '1em' }
};

export default class Admin extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount(){
    const { history, user } = this.props;
    if (!isEmpty(user) && !user.admin) {
      history.replaceState(null, '/');
    }
    this.props.registerListeners();
  }


  componentWillReceiveProps(nextProps) {
    const { history } = this.props;

    if (!isEmpty(nextProps.user) && !nextProps.user.admin) {
      history.replaceState(null, '/');
    }
  }

  componentWillUnmount(){
    this.props.unregisterListeners();
  }

  _handleTouchTap(){
    this.props.updateAllMovies(this.props.movies);
  }

  _getLoaderButton(updatedMovies, movies){
    if (!isEmpty(movies) && updatedMovies === 0){
      return (
        <FloatingActionButton
          style={styles.icon}
          backgroundColor={ Colors.deepOrange900 }
          onTouchTap={once(this._handleTouchTap.bind(this))}
          >
          <ContentRefresh />
        </FloatingActionButton>
      );
    }
    return <span/>;
  }

  _getRefreshingButton(updatedMovies, max, movies){
    if (!isEmpty(movies) && (updatedMovies !== max) && (updatedMovies !== 0)) {
      return (
        <FloatingActionButton disabled disabledColor={Colors.grey300} style={styles.icon}>
          <RefreshingIcon />
        </FloatingActionButton>
      );
    }
    return <span/>;
  }

  _getDoneButton(updatedMovies, max, movies){
    if (!isEmpty(movies) && updatedMovies === max) {
      return (
        <FloatingActionButton disabled style={styles.icon} disabledColor={Colors.green600}>
          <DoneIcon />
        </FloatingActionButton>
      );
    }
    return <span/>;
  }

  render() {
    const { updatedMovies, movies, addMovie } = this.props;
    const max = Object.keys(movies).length;
    const refreshing = max !== 0;
    const progressNumbers = refreshing ? <p>{updatedMovies} / {max}</p> : null;
    return (
      <span>
        <Card style={styles.card}>
          <CardText style={styles.cardText}>
            <p>Refresh the data of the movies in Firebase.</p>
            {progressNumbers}
            <hr/>
            <LinearProgress
              color={Colors.deepOrange800}
              mode={ isEmpty(movies) ? "indeterminate" : "determinate" }
              value={updatedMovies}
              max={max}
              />
            <hr/>
            {this._getLoaderButton.bind(this)(updatedMovies, movies)}
            {this._getRefreshingButton(updatedMovies, max, movies)}
            {this._getDoneButton(updatedMovies, max, movies)}
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
  user: PropTypes.object,
  updateAllMovies: PropTypes.func,
  updatedMovies: PropTypes.number,
  registerListeners: PropTypes.func,
  unregisterListeners: PropTypes.func,
  addMovie: PropTypes.func,
  history: PropTypes.object
};
