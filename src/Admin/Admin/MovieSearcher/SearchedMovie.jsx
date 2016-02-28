import React, { Component, PropTypes } from 'react';
import CardText from 'material-ui/lib/card/card-text';
import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import DoneIcon from 'material-ui/lib/svg-icons/action/done';
import Colors from 'material-ui/lib/styles/colors';
import Paper from 'material-ui/lib/paper';
import ImageWithPlaceholder from '../../../Widgets/ImageWithPlaceholder';
import defaultPoster from '../../../../images/mm-poster.png';

const styles = {
  hr: { clear: 'both' },
  paper: {
    marginRight: '1em',
    marginBottom: '1em',
    textAlign: 'center',
    display: 'inline-block',
    float: 'left'
  },
  img: { width: '6em' },
  container: { textAlign: 'center' },
  card: { margin: '1em', paddingBottom: '1em' }
};

export default class SearchedMovie extends Component {

  constructor(props) {
    super(props);
  }

  _handleAddMovie(){
    const { id, movie, addMovie } = this.props;
    addMovie(id, movie);
  }

  _getAddButton(cached){
    if (!cached) {
      return (
        <FloatingActionButton onTouchTap={this._handleAddMovie.bind(this)} mini title="Add to Firebase" backgroundColor={Colors.deepOrange900}>
          <ContentAdd />
        </FloatingActionButton>
      );
    }
    return <span/>;
  }

  _getAddedButton(cached){
    if (cached) {
      return (
        <FloatingActionButton disabled mini title="Already in Firebase" disabledColor={Colors.green600}>
          <DoneIcon />
        </FloatingActionButton>
      );
    }
    return <span/>;
  }

  render() {
    const { movie, cached, addMovie } = this.props;
    return (
      <Card style={styles.card}>
        <CardTitle
          titleColor={Colors.deepOrange600}
          title={movie.title}/>
        <CardText>
          <Paper style={styles.paper} zDepth={3}>
            <ImageWithPlaceholder
              placeholderSrc={defaultPoster}
              src={this.props.movie.images.poster}
              alt={this.props.movie.title}
              style={styles.img}
            />
          </Paper>
          {movie.sinopsis}
          <hr style={styles.hr}/>
          <div style={styles.container}>
          {this._getAddButton.bind(this)(cached, addMovie)}
          {this._getAddedButton(cached)}
          </div>
        </CardText>
      </Card>
    );
  }
}

SearchedMovie.propTypes = {
  movie: PropTypes.object,
  cached: PropTypes.bool,
  addMovie: PropTypes.func,
  id: PropTypes.string
};
