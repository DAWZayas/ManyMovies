import React, { Component, PropTypes } from 'react';
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import CardTitle from 'material-ui/lib/card/card-title';
import ImageWithPlaceholder from '../../../Widgets/ImageWithPlaceholder';
import RaisedButton from 'material-ui/lib/raised-button';
import Colors from 'material-ui/lib/styles/colors';
import defaultPosterSrc from '../../../../images/mm-poster.png';
import { userUid } from '../../../utils';

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

  _handleRemoveButton(e){
    e.stopPropagation();
    const { premiere, wishedMovies, auth, removeEntry } = this.props;
    const idEntry = premiere.ids.trakt;
    const idList = wishedMovies.listId;
    const idUser = userUid(auth.uid);
    removeEntry(idList, idEntry, idUser);
  }

  _handleAddButton(e){
    e.stopPropagation();
    const { premiere, wishedMovies, auth, addEntry } = this.props;
    const idEntry = premiere.ids.trakt;
    const idList = wishedMovies.listId;
    const idUser = userUid(auth.uid);
    addEntry(idList, idEntry, idUser);
  }

  render() {
    const { premiere, wishedMovies } = this.props;
    const releaseDate = new Date(Date.parse(premiere.released));
    const formatedReleased = releaseDate.toLocaleDateString('en-GB').replace(/\//g, '-');
    return (
      <Card onTouchTap={() => {this._handleTouchTap();}} style={{margin: '1em'}}>
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
            style={{width: "4em", margin: "0 1em 1em 0", float: "left"}}
          />
          {premiere.sinopsis}
          <hr style={{clear: 'both'}}/>
          <div style={{textAlign: 'center'}}>
          {
            wishedMovies.loading ?
              <span/> :
              wishedMovies.movies[premiere.ids.trakt] ?
              <RaisedButton label="In WatchList" onTouchTap={this._handleRemoveButton.bind(this)}/> :
              <RaisedButton label="Add to WatchList" onTouchTap={this._handleAddButton.bind(this)}/>
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
