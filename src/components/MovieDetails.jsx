import React, { Component, PropTypes } from 'react';
import MovieDetailsDescription from './MovieDetailsDescription';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Color from 'material-ui/lib/styles/colors';
// import Comment from './Comment';
import Table from 'material-ui/lib/table/table';
import TableBody from 'material-ui/lib/table/table-body';
import TableHeader from 'material-ui/lib/table/table-header';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import Dialog from '../../node_modules/material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

export default class MovieDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
    AddHistory: false,
    AddCollection: false,
    Added: false,
    Like: false,
    maxFanartWidth: 1100,
    fanartRatio: 1.78,
    stripedRows: false,
    showRowHover: false,
    selectable: true,
    multiSelectable: true,
    deselectOnClickaway: true,
    };
  }
  _handleHistoryTouchTap() {
    this.setState({
      AddHistory: true,
    });
  }
  _handleCollectionTouchTap() {
    this.setState({
      AddCollection: true
    });
  }
  _handleDisableHistory() {
    this.setState({
    AddHistory: false
    });
  }
  _handleDisableCollection() {
   this.setState({
   AddCollection: false
   });
  }
  _handleAddToList() {
   this.setState({
    Added: true
   });
  }
  _handleSubmitAddToList(){
    this.setState({
      Added: false
    });
  }
  _handleLike(){
    this.setState({
      Like: true
    });
  }
  render() {
    const tableStyle = {fontWeight: "bold", color: Color.lightBlueA200, textAlign: "center"};
    const submitAdd = [
    <FlatButton
        key={0}
        label="Ok"
        primary
        onTouchTap={this._handleSubmitAddToList.bind(this)}
    />
    ];
    const addToList = (
      <Dialog
        title="Select a list"
        open={this.state.Added}
        actions={submitAdd}
      >
        <Table
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}>
          <TableHeader enableSelectAll={this.state.enableSelectAll}>
            <TableRow>
              <TableHeaderColumn colSpan="1" style={{textAlign: 'center'}}>
                My lists
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}>
            <TableRow>
              <TableRowColumn style={tableStyle}>Harry Potter</TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      </Dialog>
              );

      const historyStyle = (this.state.AddHistory) ? {color: Color.white, backgroundColor: Color.deepPurple500, border: "2px solid #512DA8", margin: "1em" } : {color: Color.deepPurple500, border: "2px solid #512DA8", margin: "1em" };
      const collectionStyle = (this.state.AddCollection) ? {color: Color.white, backgroundColor: Color.teal500, border: "2px solid #00796B", margin: "1em"} : {color: Color.teal500, border: "2px solid #00796B", margin: "1em"};
    return (
      <div>
      <MovieDetailsDescription/>
        <MenuItem style={historyStyle}
                  primaryText="ADD TO HISTORY"
                  onTouchTap={this.state.AddHistory ? this._handleDisableHistory.bind(this) : this._handleHistoryTouchTap.bind(this)}
        />
        <MenuItem style={collectionStyle}
                  primaryText="ADD TO COLLECTION"
                  onTouchTap={this.state.AddCollection ? this._handleDisableCollection.bind(this) : this._handleCollectionTouchTap.bind(this)}
        />
        <MenuItem style={{color: Color.red500, border: "2px solid #F44336", margin: "1em"}}
                  primaryText="ADD TO LIST"
                  onTouchTap={this._handleAddToList.bind(this)}
        />
      {addToList}
      </div>
    );
  }
}

MovieDetails.propTypes = {
  lists: PropTypes.object,
  movie: PropTypes.object,
  addEntry: PropTypes.func
};

MovieDetails.defaultProps = {
  movie: {
    "title": "American History X",
    "released": "1998-10-30",
    "ids": {
      "trakt": 43,
      "slug": "american-history-x-1998",
      "imdb": "tt0120586",
      "tmdb": 73
    },
    "sinopsis": "Derek Vineyard is paroled after serving 3 years in prison for killing two thugs who tried to break into/steal his truck. Through his brother, Danny Vineyard's narration, we learn that before going to prison, Derek was a skinhead and the leader of a violent white supremacist gang that committed acts of racial crime throughout L.A. and his actions greatly influenced Danny. Reformed and fresh out of prison, Derek severs contact with the gang and becomes determined to keep Danny from going down the same violent path as he did.",
    "runtime": 119,
    "votes": 7659,
    "rating": 8.70296,
    "genres": [
      "drama"
    ],
    "certification": "R",
    "tagline": "Some Legacies Must End.",
    "trailer": "http://youtube.com/watch?v=JsPW6Fj3BUI",
    "images": {
      "poster": "https://walter.trakt.us/images/movies/000/000/043/posters/thumb/3943ed4449.jpg",
      "fanart": "https://walter.trakt.us/images/movies/000/000/043/fanarts/thumb/4144a111c1.jpg"
    }
  },
  likes: {likes:100, dislikes:20 },

  historyList: {
    id: '3',
    title: 'History',
    slug: 'history',
    desc: 'A list of watched movies',
    custom: false
  },
  collectionList: {
    id: '4',
    title: 'Collection',
    slug: 'collection',
    desc: 'A list of collected movies',
    custom: false,
  },
  generalLists: [
    {'2': {
      id: '2',
      title: 'WatchList',
      slug: 'watchlist',
      desc: 'A list of pending movies',
      custom: false
      }
    },

    {'1': {
      id: '1',
      title: 'Harry potter movies',
      slug:'harry-potter-movies',
      desc: 'All the magic in Howarts',
      custom: true,
      }
    }
  ],

  userLikes: -1,
  listedIn: ['1', '2', '3']
};
