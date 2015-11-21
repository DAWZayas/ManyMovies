import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import Color from 'material-ui/lib/styles/colors';
import Table from 'material-ui/lib/table/table';
import TableBody from 'material-ui/lib/table/table-body';
import TableHeader from 'material-ui/lib/table/table-header';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import Paper from 'material-ui/lib/paper';
import FontIcon from 'material-ui/lib/font-icon';
import TextField from 'material-ui/lib/text-field';
import defaultPosterSrc from '../../images/mm-poster.png';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default class Movies extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: true,
      displayRowCheckbox: false,
      displaySelectAll: false,
      adjustForCheckbox: false,
      listedMovies: props.movies
    };
  }

  _handleKeyDown(e){
    if (e.keyCode === 27){
      this.refs.search.clearValue();
      this.refs.search.blur();
      this._showSearchedMovies();
    }
  }

  _handleTouchTap(slug){
    console.log(slug);
    this.props.navigate('/lists');
  }

  _handleSearchFocus(){
    this.refs.search.clearValue();
    this._showSearchedMovies();
  }

  _handleSearchChange(){
    this._showSearchedMovies();
  }

  _isSearched(value){
    const searchTerm = this.refs.search.getValue().toLowerCase().trim();
    const title = value.title.toLowerCase();
    return title.indexOf(searchTerm) !== -1;
  }

  _showSearchedMovies(){
    const listedMovies = _.pick(this.props.movies, this._isSearched, this);
    this.setState({listedMovies});
  }

  render() {

    return (
      <div>
        <Paper style={{display: "flex", justifyContent: "center"}}>
          <FontIcon style={{lineHeight: "2em"}} className="material-icons">search</FontIcon>
          <TextField
            ref="search"
            style={{flexGrow: "20"}}
            hintText="Search a movie"
            onChange={this._handleSearchChange.bind(this)}
            onFocus={this._handleSearchFocus.bind(this)}
            onKeyDown={this._handleKeyDown.bind(this)}
          />
        </Paper>
        <Table
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={false}
        >
          <TableHeader
            displaySelectAll={this.state.displaySelectAll}
            adjustForCheckbox={this.state.adjustForCheckbox}
          >
            <TableRow>
              <TableHeaderColumn colSpan="2" style={{textAlign: "center", color: Color.deepOrange800, fontSize: "1.3em"}}>
                Movies
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.displayRowCheckbox}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {
              _.values(this.state.listedMovies).map((movie, index) => (
              <TableRow onTouchTap={this._handleTouchTap.bind(this, movie.ids.slug)} key={index}>
                <TableRowColumn style={{width: "4em", padding: "0"}}>{<img style={{width: "4em"}} src={defaultPosterSrc} alt="caca"/>}</TableRowColumn>
                <TableRowColumn style={{paddingLeft:"0.4em"}}>{movie.title}</TableRowColumn>
              </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>
    );
  }
}

Movies.propTypes = {
  movies: PropTypes.object,
  navigate: PropTypes.func
};

Movies.defaultProps = {
  movies: []
};
