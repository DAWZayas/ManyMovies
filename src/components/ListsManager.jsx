import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addEntry, removeEntry } from '../actions';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import FontIcon from 'material-ui/lib/font-icon';
import Color from 'material-ui/lib/styles/colors';
import _ from 'lodash';

export default class ListsManager extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _getHistoryItem(){
    const { lists, movie, entries, addEntry, removeEntry } = this.props;
    const idMovie = movie.ids.trakt.toString();
    const idHistory = _.findKey(lists, { slug: 'history' });
    const isInHistory = entries[idHistory].indexOf(idMovie) !== -1;
    const historyStyle = isInHistory ?
      {color: Color.white, backgroundColor: Color.deepPurple500, border: "2px solid #512DA8", margin: "1em" } :
      {color: Color.deepPurple500, border: "2px solid #511DA8", margin: "1em" };
    const histoyIconColor = isInHistory ? Color.white : Color.deepPurple500;
    const handler = isInHistory ?
      () => {removeEntry(idHistory, idMovie);} :
      () => {addEntry(idHistory, idMovie);};
    return (
      <ListItem
          leftIcon={<FontIcon color={histoyIconColor} className="material-icons">history</FontIcon>}
          style={historyStyle}
          primaryText="ADD TO HISTORY"
          onTouchTap={handler}
        />
    );
  }

  _getCollectionItem(){
    const { lists, movie, entries, addEntry, removeEntry } = this.props;
    const idMovie = movie.ids.trakt.toString();
    const idCollection = _.findKey(lists, { slug: 'collection'});
    const isInCollection = entries[idCollection].indexOf(idMovie) !== -1;
    const collectionStyle = isInCollection ?
      {color: Color.white, backgroundColor: Color.teal500, border: "2px solid #00796B", margin: "1em"} :
      {color: Color.teal500, border: "2px solid #00796B", margin: "1em"};
    const collectionIconColor = isInCollection ? Color.white : Color.teal500;
    const handler = isInCollection ?
      () => {removeEntry(idCollection, idMovie);} :
      () => {addEntry(idCollection, idMovie);};
    return (
      <ListItem
          leftIcon={<FontIcon color={collectionIconColor} className="material-icons">content_copy</FontIcon>}
          style={collectionStyle}
          primaryText="ADD TO COLECTION"
          onTouchTap={handler}
        />
    );
  }

  render() {
    const { lists/*, movie, entries */} = this.props;
    //const idMovie = movie.ids.trakt.toString();
    const idWactchList = _.findKey(lists, { slug: 'watchlist'});

    return (
      <List>
        {this._getHistoryItem()}
        {this._getCollectionItem()}
        <ListItem
          leftIcon={<FontIcon className="material-icons">list</FontIcon>}
          primaryText="ADD TO LIST"
          onTouchTap={() => {console.log(idWactchList);}}
        />
      </List>
    );
  }
}

ListsManager.propTypes = {
  movie: PropTypes.object,
  lists: PropTypes.object,
  entries: PropTypes.object,
  addEntry: PropTypes.func,
  removeEntry: PropTypes.func
};

ListsManager.defaultProps = {

};

function mapStateToProps(state, ownProps) {
  const { lists, entries } = state;
  return { state, ownProps, lists, entries };
}

function mapDispatchToProps(dispatch) {
  return {
    addEntry: (idCollection, id) => dispatch(addEntry(idCollection, id)),
    removeEntry: (idCollection, id) => dispatch(removeEntry(idCollection, id))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListsManager);
