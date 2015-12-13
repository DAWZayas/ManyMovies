import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import Table from 'material-ui/lib/table/table';
import TableBody from 'material-ui/lib/table/table-body';
import Paper from 'material-ui/lib/paper';
import FontIcon from 'material-ui/lib/font-icon';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ScrollToTop from 'react-scroll-up';
import CircularProgress from 'material-ui/lib/circular-progress';
import Colors from 'material-ui/lib/styles/colors';
import TextField from 'material-ui/lib/text-field';
import Dialog from '../../node_modules/material-ui/lib/dialog';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import MovieRow from './MovieRow';
import { getDocHeight } from '../utils';
import { genres } from '../utils/examples';
import $ from 'jquery';
import MoviesListHeader from './MoviesListHeader';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const PAGE_SIZE = 10;

export default class Movies extends Component {

  constructor(props) {
    super(props);
    this.state = {
      maxMovies: PAGE_SIZE,
      loadMoreHandler: this._loadMoreOnBottom.bind(this),
      loading: false,
      choosingGenre: false,
      genre: 'all',
      searchTerm: ''
    };
  }

  componentDidMount(){
    window.addEventListener("scroll", this.state.loadMoreHandler);
  }

  componentWillUpdate(){
  }

  componentWillUnmount(){
    window.removeEventListener("scroll", this.state.loadMoreHandler);
  }

  _loadMoreOnBottom() {
    const listedMovies = this._getListedMovies.bind(this)();
    if (this.state.maxMovies >= _.keys(listedMovies).length){
      return;
    }
    if ($(window).scrollTop() + $(window).height() > getDocHeight() - 15) {
      $('body').css('cursor', 'progress');
      setTimeout(() => {
         this.setState({loading: true});
        }
        , 0);
      setTimeout(() => {
        $('body').css('cursor', 'initial');
        this.setState({maxMovies: this.state.maxMovies + PAGE_SIZE, loading: false});
      }, 3000);
    }
  }

  _handleKeyDown(e){
    if (e.keyCode === 27){
      this.refs.search.clearValue();
      this.refs.search.blur();
      this.setState({ searchTerm: '' });
    }
  }

  _handleSearchFocus(){
    this.refs.search.clearValue();
    this.setState({ searchTerm: '' });
  }

  _handleSearchChange(){
    const searchTerm = this.refs.search.getValue().toLowerCase().trim();
    this.setState({ searchTerm });
  }

  _handleChooseGenreTap(){
    setTimeout(() => {
      this.setState({ choosingGenre: true });
    }, 250);
  }

  _handleGenreClick(genre){
    this._stopChoosingGenre.bind(this)();
    this.setState({ genre });
  }

  _isSearched(value){
    const searchTerm = this.state.searchTerm;
    const title = value.title.toLowerCase();
    return title.indexOf(searchTerm) !== -1;
  }

  _stopChoosingGenre(){
    this.refs.search.clearValue();
    this.setState({choosingGenre: false, searchTerm: '' });
  }

  _filterByGenre(movie){
    const { genre } = this.state;
    return ( genre === 'all') ? true : movie.genres.indexOf(genre) !== -1;
  }

  _getListedMovies(){
    const searchedMovies = _.pick(this.props.movies, this._isSearched, this);
    const listedMovies = _.pick(searchedMovies, this._filterByGenre, this);
    return listedMovies;
  }

  render() {
    const { maxMovies, genre } = this.state;
    const listedMovies = this._getListedMovies.bind(this)();
    const progress = this.state.loading ?
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <CircularProgress
          mode="indeterminate"
          color={Colors.deepOrange900}
        />
      </div>
      :
      null;
    const genreDialog = (
      <Dialog
        style={{ textAlign: 'center' }}
        titleStyle={{ color: Colors.deepOrange500 }}
        title="Choose a genre"
        open={this.state.choosingGenre}
        onRequestClose={() => { this._stopChoosingGenre();}}
        autoScrollBodyContent
        >
        <List>
        {
          genres.map((genre, index) => (
            <ListItem
              key={index}
              primaryText={_.capitalize(genre)}
              onClick={this._handleGenreClick.bind(this, genre)}
              />
            )
          )
        }
        </List>
      </Dialog>
    );
    return (
      <div>
        <Paper style={{padding: '1em 1em 2em 1em'}}>
          <div style={{display: "flex", justifyContent: "center"}}>
            <FontIcon style={{lineHeight: "2em"}} className="material-icons">search</FontIcon>
            <TextField
              ref="search"
              style={{flexGrow: "20"}}
              hintText="Search a movie"
              onChange={this._handleSearchChange.bind(this)}
              onFocus={this._handleSearchFocus.bind(this)}
              onKeyDown={this._handleKeyDown.bind(this)}
            />
          </div>
          <TextField
            onTouchTap={this._handleChooseGenreTap.bind(this)}
            style={{padding: "0 0.3em"}}
            floatingLabelText=" Choose a genre"
            disabled
            value={` ${_.capitalize(genre)}`}
            fullWidth
            underlineDisabledStyle={{border: `1px solid ${Colors.grey200}`}}
          />
          {genreDialog}
        </Paper>
        <Table
          height={this.state.height}
          fixedHeader
          selectable={false}
        >
          { MoviesListHeader }
          <TableBody
            displayRowCheckbox={false}
            showRowHover
            stripedRows={false}
          >
          t
            {
              _.values(listedMovies).slice(0, maxMovies ).map((movie) => (
                  <MovieRow key={movie.ids.trakt} navigate={this.props.navigate} movie={movie}/>
                )
              )
            }
          </TableBody>
        </Table>
        {progress}
        <ScrollToTop showUnder={300}>
          <FloatingActionButton backgroundColor={Colors.orange600}>
            <FontIcon className="material-icons">arrow_upward</FontIcon>
          </FloatingActionButton>
        </ScrollToTop>
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
