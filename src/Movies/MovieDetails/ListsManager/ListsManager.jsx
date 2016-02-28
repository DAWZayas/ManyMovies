import React, { Component, PropTypes } from 'react';
import List from 'material-ui/lib/lists/list';
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';
import ListItem from 'material-ui/lib/lists/list-item';
import FontIcon from 'material-ui/lib/font-icon';
import Color from 'material-ui/lib/styles/colors';
import { findKey, isEmpty, find, reject } from 'lodash';

export default class ListsManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addingToLists: false,
      loading: true
    };
  }

  componentWillMount() {
    this.props.registerListeners(this.props.user.userName);
  }

  componentWillReceiveProps() {
    this.setState({ loading: false });
  }

  componentWillUnmount() {
    this.props.unregisterListeners(this.props.user.userName);
  }

  _handleDialogRequestClose() {
    this._stopAddingToLists();
  }

  _stopAddingToLists(){
    this.setState({addingToLists: false});
  }

  _startAddingToLists(){
    this.setState({addingToLists: true});
  }

  _getListItem(id, color, iconName, title, key){
    const { movie, entries, addEntry, removeEntry, user } = this.props;
    const idMovie = movie.ids.trakt.toString();
    const isInList = entries[id] && entries[id][idMovie];
    const itemStyle = isInList ?
      { color: Color.white, backgroundColor: color, border: `2px solid ${color}`, marginBottom: '1em', fontWeight: 'bold', textAlign: 'center' } :
      { color: color, border: `2px solid ${color}`, marginBottom: '1em', fontWeight: 'bold', textAlign: 'center' };
    const iconColor = isInList ? Color.white : color;
    const handler = isInList ?
      () => { removeEntry(id, idMovie, user.userName); } :
      () => { addEntry(id, idMovie, user.userName); };
    const label = isInList ? 'IN' : 'ADD TO';
    return iconName !== 'none' ? (
      <ListItem
        key={key}
        leftIcon={<FontIcon color={iconColor} className="material-icons">{iconName}</FontIcon>}
        style={itemStyle}
        primaryText={`${label} ${title.toUpperCase()}`}
        onTouchTap={handler}
      />
    ) : (
      <ListItem
        key={key}
        style={itemStyle}
        primaryText={`${label} ${title.toUpperCase()}`}
        onTouchTap={handler}
      />
    );
  }

  _getGeneralListsItem(){
    const isInGeneralLists = this._isInGeneralLists();
    const itemStyle = isInGeneralLists ?
      { color: Color.white, backgroundColor: Color.red900, border: `2px solid ${Color.red900}`, fontWeight: 'bold', textAlign: 'center' } :
      { color: Color.red900, border: `2px solid ${Color.red900}`, fontWeight: 'bold', textAlign: 'center' };
    const iconColor = isInGeneralLists ? Color.white : Color.red900;
    const label = isInGeneralLists ? 'IN' : 'ADD TO';
    return (
      <ListItem
          leftIcon={<FontIcon color={iconColor} className="material-icons">list</FontIcon>}
          style={itemStyle}
          primaryText={`${label} LISTS`}
          onTouchTap={this._startAddingToLists.bind(this)}
        />
    );
  }

  _isInGeneralLists(){
    const { movie, entries } = this.props;
    const generalLists = this._getGeneralLists();
    const idMovie = movie.ids.trakt.toString();
    return find(generalLists, list => entries[list.id] && entries[list.id][idMovie]);
  }

  _getGeneralLists(){
    const { lists } = this.props;
    return reject(lists, list => list.slug === 'history' || list.slug === 'collection');
  }

  _getAddToListsDialog(){
    const lists = this._getGeneralLists();
    let index = 0;
    const listColors = [
      Color.red500,
      Color.orange500,
      Color.yellow600,
      Color.lightGreen500,
      Color.blue500,
      Color.indigo500,
      Color.purple500
];
    const dialogActions = [
      <FlatButton
        key={0}
        label="OK"
        secondary
        onTouchTap={this._handleDialogRequestClose.bind(this)}
      />,
    ];

    const dialog = (
      <Dialog
        actions={dialogActions}
        actionFocus="submit"
        open={this.state.addingToLists}
        onRequestClose={this._handleDialogRequestClose.bind(this)}
        autoDetectWindowHeight
        autoScrollBodyContent
        >
        <List>
        {
          lists.map((list, key) => this._getListItem(list.id, listColors[index++ % listColors.length], 'none', list.title, key))
        }
        </List>
      </Dialog>);

    return dialog;
  }

  render() {
    const { lists } = this.props;
    const idHistory = findKey(lists, { slug: 'history' });
    const idCollection = findKey(lists, { slug: 'collection'});
    return isEmpty(lists) ? (
      <div></div>
    ) : (
      <List>
        {this._getAddToListsDialog()}
        {this._getListItem(lists[idHistory].id, Color.deepPurple500, 'history', 'history', 0)}
        {this._getListItem(lists[idCollection].id, Color.teal500, 'content_copy', 'collection', 1)}
        {this._getGeneralListsItem()}
      </List>
    );
  }
}

ListsManager.propTypes = {
  movie: PropTypes.object,
  lists: PropTypes.array,
  entries: PropTypes.object,
  addEntry: PropTypes.func,
  removeEntry: PropTypes.func,
  user: PropTypes.object,
  registerListeners: PropTypes.func,
  unregisterListeners: PropTypes.func
};

ListsManager.defaultProps = {

};
