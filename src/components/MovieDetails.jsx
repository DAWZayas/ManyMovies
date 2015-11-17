import React, { Component, PropTypes } from 'react';
import Card from 'material-ui/lib/card/card';
import CardMedia from'material-ui/lib/card/card-media';
import CardText from 'material-ui/lib/card/card-text';
import CardTitle from 'material-ui/lib/card/card-title';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Dialog from '../../node_modules/material-ui/lib/dialog';
import Color from 'material-ui/lib/styles/colors';
import FlatButton from 'material-ui/lib/flat-button';
import ListsContainer from '../containers/ListsContainer';

import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

export default class MovieDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
    AddHistory: false,
    AddCollection: false,
    close: false
    };
  }
  _handleHistoryTouchTap() {
    this.setState({
      AddHistory: true,
      close: true});
  }
  _handleCollectionTouchTap() {
    this.setState({
      AddCollection: true,
      close: true});
  }
  _handleRequestClose() {
    this.setState({close: false});
  }
  render() {
      const addedDialogActions = [
      <FlatButton
        key={0}
        label="Ok"
        primary
        onTouchTap={this._handleRequestClose.bind(this)}
      />
      ];

      const addedToHistoryDialog = [
                  <Dialog
                   title="Added to history"
                   actions={addedDialogActions}
                   open={this.state.AddHistory}
                   onRequestClose={this._handleRequestClose.bind(this)}
                  />
                  ];
      const addedToCollectionDialog = [
                  <Dialog
                   title="Added to collection"
                   actions={addedDialogActions}
                   open={this.state.AddCollection}
                   onRequestClose={this._handleRequestClose.bind(this)}
                  />
                  ];
    return (
      <div>
      <Card style={{width: "100%", justifyContent: "space-between", margin: "0 auto"}} >
          <CardMedia overlay={
            <CardTitle style={{height: "80px", color: "white", fontSize: "24px"}}>
              Titulooooooooo
            </CardTitle> }>
            <img style={{opacity: "0.8"}} src="https://walter.trakt.us/images/movies/000/130/970/fanarts/thumb/58994fad62.jpg"/>
          </CardMedia>
          <CardText>
          <div>
            <li> <img style={{border: "1px solid #727272", float:"left", height: "13em", marginRight: "2em"}} src="https://walter.trakt.us/images/movies/000/130/970/posters/thumb/baa71aa408.jpg"/> </li>
            <li> <span style={{color: Color.red500}}>Released: </span> 2015-07-10 </li>
            <li> <span style={{color: Color.red500}}>Runtime: </span> 91 </li>
            <li> <span style={{color: Color.red500}}>Genres: </span> adventure, animation, comedy, family </li>
            <li> <span style={{color: Color.red500}}>Certification: </span> PG </li>
            <li><MenuItem href="http://youtube.com/watch?v=UvOSamXmU2E"><i className="material-icons">movie</i>Trailer</MenuItem>
 </li>
            </div>
          </CardText>
          <CardText style={{padding: "1em", fontSize: "1em", clear: "left"}}>
           bbbbbb jhhhhhh ujjjjj hhhhkkkkkk ooooooo ooooooo uuuuuuuuuuuuuuu i i i i iiiiiiiiiiiiiiiii hgbhjdsbhhhhhhhhhhhhhhhhhhhhhhhhhhhhhMinions Stuart, Kevin and Bob are recruited by Scarlet Overkill, a super-villain who, alongside her inventor husband Herb, hatches a plot to take over the world.
          </CardText>
      </Card>
      <div>
        <MenuItem style={{color: Color.deepPurple500, border: "2px solid #512DA8", margin: "1em" }}
                  primaryText="ADD TO HISTORY"
                  onTouchTap={this._handleHistoryTouchTap.bind(this)}
        />
        <MenuItem style={{color: Color.teal500, border: "2px solid #00796B", margin: "1em"}}
                  primaryText="ADD TO COLLECTION"
                  onTouchTap={this._handleCollectionTouchTap.bind(this)}
        />
        <MenuItem style={{color: Color.red500, border: "2PX solid #F44336", margin: "1em"}}
                  primaryText="ADD TO LIST"
                  onTouchTap={<ListsContainer/>}
        />
      </div>
     {addedToHistoryDialog}
     {addedToCollectionDialog}
      </div>
    );
  }
}

MovieDetails.propTypes = {
  movie: PropTypes.object,
  handler : PropTypes.func
};

MovieDetails.defaultProps = {
  movie: {}
};
