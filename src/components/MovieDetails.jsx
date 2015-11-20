import React, { Component, PropTypes } from 'react';
import Card from 'material-ui/lib/card/card';
import CardMedia from'material-ui/lib/card/card-media';
import CardText from 'material-ui/lib/card/card-text';
import CardTitle from 'material-ui/lib/card/card-title';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Color from 'material-ui/lib/styles/colors';
import Comment from './Comment';
import Table from 'material-ui/lib/table/table';
import TableBody from 'material-ui/lib/table/table-body';
import TableHeader from 'material-ui/lib/table/table-header';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import Dialog from '../../node_modules/material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import IconButton from 'material-ui/lib/icon-button';
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
    deselectOnClickaway: true
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
          selectable={this.state.selectable}>
          <TableHeader>
            <TableRow>
             <TableHeaderColumn colSpan="1" style={{textAlign: 'center'}}/>
            </TableRow>
          </TableHeader>
          <TableBody
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
          >
          <TableRow>
            <TableRowColumn style={tableStyle}>Watched</TableRowColumn>
          </TableRow>
          </TableBody>
          </Table>
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
          <TableRow>
            <TableRowColumn style={tableStyle}>The Mortal instruments</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn style={tableStyle}>Harry Potter</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn style={tableStyle}>The Mortal instruments</TableRowColumn>
          </TableRow>
          </TableBody>
        </Table>
      </Dialog>
              );

      const historyStyle = (this.state.AddHistory) ? {color: Color.white, backgroundColor: Color.deepPurple500, border: "2px solid #512DA8", margin: "1em" } : {color: Color.deepPurple500, border: "2px solid #512DA8", margin: "1em" };
      const collectionStyle = (this.state.AddCollection) ? {color: Color.white, backgroundColor: Color.teal500, border: "2px solid #00796B", margin: "1em"} : {color: Color.teal500, border: "2px solid #00796B", margin: "1em"};
      const backWidth =  document.documentElement.clientWidth > this.state.maxFanartWidth ? this.state.maxFanartWidth : document.documentElement.clientWidth;
      //const likeBtnStyle = (this.state.Like) ? {color: red} : {color: white};
    return (
      <div>
      <Card >
          <CardMedia overlay={
            <CardTitle style={{height: "3em", color: "white", fontSize: "1.5em"}}>
             Title
             <span>
              <IconButton onTouchTap={this._handleLike.bind(this)}>
                <i className="material-icons">favorite</i>
              </IconButton>
             </span>
            </CardTitle> }>
            <div style={{
              height: backWidth / this.state.fanartRatio,
              textAlign:"center",
              backgroundImage: "url('https://walter.trakt.us/images/movies/000/130/970/fanarts/thumb/58994fad62.jpg')",
              backgroundSize:"cover"}}/>
          </CardMedia>
          <CardText>
          <div style={{display: "flex", width: "100%", margin: "0 auto"}}>
            <div>
            <li> <img style={{border: "1px solid #727272", float:"left", height: "13em", marginRight: "2em"}} src="https://walter.trakt.us/images/movies/000/130/970/posters/thumb/baa71aa408.jpg"/> </li>
            </div>
            <div>
            <li> <span style={{color: Color.red500}}>Released: </span> 2015-07-10 </li>
            <li> <span style={{color: Color.red500}}>Runtime: </span> 91 </li>
            <li> <span style={{color: Color.red500}}>Genres: </span> adventure, animation, comedy, family </li>
            <li> <span style={{color: Color.red500}}>Certification: </span> PG </li>
            <li> <MenuItem href="http://youtube.com/watch?v=UvOSamXmU2E"><i className="material-icons">movie</i>Trailer</MenuItem> </li>
            </div>
            </div>
          </CardText>
          <CardText style={{padding: "1em", fontSize: "1em", clear: "left"}}>
           bbbbbb jhhhhhh ujjjjj hhhhkkkkkk ooooooo ooooooo uuuuuuuuuuuuuuu i i i i iiiiiiiiiiiiiiiii hgbhjdsbhhhhhhhhhhhhhhhhhhhhhhhhhhhhhMinions Stuart, Kevin and Bob are recruited by Scarlet Overkill, a super-villain who, alongside her inventor husband Herb, hatches a plot to take over the world.
          </CardText>
      </Card>
      <div>
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
      </div>
      <Comment />
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
