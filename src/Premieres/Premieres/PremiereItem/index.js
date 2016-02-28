import React, { Component, PropTypes } from 'react';
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import CardTitle from 'material-ui/lib/card/card-title';
import ImageWithPlaceholder from '../../../Widgets/ImageWithPlaceholder';
import RaisedButton from 'material-ui/lib/raised-button';
import Colors from 'material-ui/lib/styles/colors';
import defaultPosterSrc from '../../../../images/mm-poster.png';
import { userUid } from '../../../utils';

const styles = {
  img: { width: '4em', margin: '0 1em 1em 0', float: 'left' },
  card: { margin: '1em' },
  hr: { clear: 'both' },
  container: { textAlign: 'center' }
};

export default class PremiereItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  _handleTouchTap(){
    const { premiere, navigate } = this.props;
    const { slug } = premiere.ids;
    setTimeout(() => {
      navigate(`/movies/${slug}`);
    }, 200);
  }

  _getButton(label, callback){
    return <RaisedButton label={label} onTouchTap={this._handleButtonTouchTap.bind(this, callback)}/>;
  }

  _handleButtonTouchTap(callback, e){
    e.stopPropagation();
    const { premiere, wishedMovies, auth } = this.props;
    const idEntry = premiere.ids.trakt;
    const idList = wishedMovies.listId;
    const idUser = userUid(auth.uid);
    callback(idList, idEntry, idUser);
  }

  render() {
    const { premiere, wishedMovies, addEntry, removeEntry } = this.props;
    const releaseDate = new Date(Date.parse(premiere.released));
    const formatedReleased = releaseDate.toLocaleDateString('en-GB').replace(/\//g, '-');

    return (
      <Card onTouchTap={() => {this._handleTouchTap();}} style={styles.card}>
        <CardTitle
          title={premiere.title}
          subtitle={formatedReleased}
          titleColor={Colors.deepOrange900}
          />
        <CardText>
          <ImageWithPlaceholder
            placeholderSrc={defaultPosterSrc}
            src={premiere.images.poster}
            alt={premiere.title}
            style={styles.img}
          />
          {premiere.sinopsis}
          <hr style={styles.hr}/>
          <div style={styles.container}>
          {
            wishedMovies.loading ?
              <span/> :
              wishedMovies.movies[premiere.ids.trakt] ?
                this._getButton.bind(this)("In WatchList", removeEntry) :
                this._getButton.bind(this)("Add to WatchList", addEntry)
          }
          </div>
        </CardText>
      </Card>
    );
  }
}

PremiereItem.propTypes = {
  auth: PropTypes.object,
  premiere: PropTypes.object,
  navigate: PropTypes.func,
  wishedMovies: PropTypes.object,
  addEntry: PropTypes.func,
  removeEntry: PropTypes.func
};
