import React, { Component } from 'react';
import Card from 'material-ui/lib/card/card';
import CardMedia from'material-ui/lib/card/card-media';
import CardText from 'material-ui/lib/card/card-text';
import CardTitle from 'material-ui/lib/card/card-title';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Color from 'material-ui/lib/styles/colors';
import Comment from './Comment';
import Searcher from './Searcher';
import Table from 'material-ui/lib/table/table';
import TableBody from 'material-ui/lib/table/table-body';
import TableHeader from 'material-ui/lib/table/table-header';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import Dialog from '../../node_modules/material-ui/lib/dialog';
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();
export default class MovieDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
    AddHistory: false,
    AddCollection: false,
    Added: false
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
  render() {

    const addToList = (
      <Dialog
        title="Select a list"
        open={this.state.Added}
        onRequestClose={this._handleSubmitAddToList.bind(this)}
      >
    <Table
      height={this.state.height}
      fixedHeader={this.state.fixedHeader}
      fixedFooter={this.state.fixedFooter}
      selectable={this.state.selectable}
      multiSelectable={this.state.multiSelectable}
      onRowSelection={this._onRowSelection}>
      <TableHeader enableSelectAll={this.state.enableSelectAll}>
        <TableRow>
          <TableHeaderColumn colSpan="3" tooltip="My lists" style={{textAlign: 'center'}}>
            My lists
          </TableHeaderColumn>
        </TableRow>
        <TableRow>
          <TableHeaderColumn/>
          <TableHeaderColumn tooltip="title">Title</TableHeaderColumn>
          <TableHeaderColumn tooltip="desc">Description</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody
        deselectOnClickaway={this.state.deselectOnClickaway}
        showRowHover={this.state.showRowHover}
        stripedRows={this.state.stripedRows}>
      <TableRow>
          <TableRowColumn />
          <TableRowColumn>Harry Potter</TableRowColumn>
          <TableRowColumn>All the magic in Howarts</TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn />
          <TableRowColumn>The Mortal instruments</TableRowColumn>
          <TableRowColumn>blablab blabla blabla bla bla blalalalala</TableRowColumn>
        </TableRow>
      <TableRow>
          <TableRowColumn />
          <TableRowColumn>Harry Potter</TableRowColumn>
          <TableRowColumn>All the magic in Howarts</TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn />
          <TableRowColumn>The Mortal instruments</TableRowColumn>
          <TableRowColumn>blablab blabla blabla bla bla blalalalala</TableRowColumn>
        </TableRow>
       </TableBody>
       </Table>
            </Dialog>
              );

      const historyStyle = (this.state.AddHistory) ? {color: Color.white, backgroundColor: Color.deepPurple500, border: "2px solid #512DA8", margin: "1em" } : {color: Color.deepPurple500, border: "2px solid #512DA8", margin: "1em" };
      const collectionStyle = (this.state.AddCollection) ? {color: Color.white, backgroundColor: Color.teal500, border: "2px solid #00796B", margin: "1em"} : {color: Color.teal500, border: "2px solid #00796B", margin: "1em"};
    return (
      <div>
      <Searcher />
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
            <li> <MenuItem href="http://youtube.com/watch?v=UvOSamXmU2E"><i className="material-icons">movie</i>Trailer</MenuItem> </li>
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
        <MenuItem style={{color: Color.red500, border: "2PX solid #F44336", margin: "1em"}}
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
