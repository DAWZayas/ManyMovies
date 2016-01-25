import React, { Component, PropTypes } from 'react';
import { isEqual, values } from 'lodash';
import Table from 'material-ui/lib/table/table';
import TableBody from 'material-ui/lib/table/table-body';
import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Paper from 'material-ui/lib/paper';
import ScrollTop from '../../../Widgets/ScrollTop';
import Colors from 'material-ui/lib/styles/colors';
import TextField from 'material-ui/lib/text-field';
import Spinner from '../../../Widgets/Spinner';
import MovieRow from '../../Movies/MovieRow';
import MoviesListHeader from '../../Movies/MoviesListHeader';
import $ from 'jquery';
import { getDocHeight } from '../../../utils';
import { capitalize } from 'lodash';
import { genres } from '../../../utils/examples';

export default class Movies extends Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      genre: 'all',
      loading: true,
      loadMoreHandler: this._loadMoreOnBottom.bind(this),
      choosingGenre: false
    };
  }

  componentWillMount(){
    const searchedGenre = this.state.genre === 'all' ? '' : this.state.genre;
    this.props.registerListeners(searchedGenre, this.state.page);
  }

  componentDidMount(){
    window.addEventListener("scroll", this.state.loadMoreHandler);
  }

  componentWillReceiveProps() {
    this.setState({ loading: false });
  }

  componentWillUpdate(nextProps, nextState){
    if (!isEqual(this.state, nextState) && !this.state.loading) {
      const searchedGenre = nextState.genre === 'all' ? '' : nextState.genre;
      this.props.registerListeners(searchedGenre, nextState.page);
    }
  }

  componentWillUnmount(){
    this.props.unregisterListeners();
    window.removeEventListener("scroll", this.state.loadMoreHandler);
  }

  _handleChooseGenreTap(){
    setTimeout(() => {
      this.setState({ choosingGenre: true });
    }, 250);
  }

  _handleGenreClick(genre){
    this.setState({ genre, choosingGenre: false });
  }

  _handleTitleSearcher(){
    setTimeout(() => {
      this.props.navigate('/movies/');
    }, 200);
  }

  _loadMoreOnBottom() {
    if ($(window).scrollTop() + $(window).height() > getDocHeight() - 15) {
      setTimeout(() => {
         this.setState({page: this.state.page + 1});
        }
        , 0);
    }
  }

  render() {
    const { movies } = this.props;
    const { genre } = this.state;
    const genreDialog = (
      <Dialog
        style={{ textAlign: 'center' }}
        titleStyle={{ color: Colors.deepOrange500 }}
        title="Choose a genre"
        open={this.state.choosingGenre}
        onRequestClose={() => { this.setState({choosingGenre: false });}}
        autoScrollBodyContent
        >
        <List>
        {
          genres.map((genre, index) => (
            <ListItem
              key={index}
              primaryText={capitalize(genre)}
              onClick={this._handleGenreClick.bind(this, genre)}
              />
            )
          )
        }
        </List>
      </Dialog>
    );
    const contents = this.state.loading ?
      <Spinner/>
      :
      (<div>
        <Paper style={{padding: '1em 1em 2em 1em'}}>
          <div style={{display: "flex", justifyContent: "center"}}>
            <TextField
              onTouchTap={this._handleChooseGenreTap.bind(this)}
              style={{padding: "0 0.3em"}}
              floatingLabelText=" Choose a genre"
              defaultValue="All"
              disabled
              value={` ${capitalize(genre)}`}
              fullWidth
              underlineDisabledStyle={{border: `1px solid ${Colors.grey200}`}}
            />
            {genreDialog}
          </div>
          <div style={{display: "flex", justifyContent: "center"}}>
            <RaisedButton
              label="Search by title"
              onTouchTap={this._handleTitleSearcher.bind(this)}
              />
          </div>
        </Paper>
        <Table
          fixedHeader
          selectable={false}
        >
          { MoviesListHeader }
          <TableBody
            displayRowCheckbox={false}
            showRowHover
            stripedRows={false}
          >
            {
              values(movies).map((movie) => (
                  <MovieRow key={movie.ids.trakt} navigate={this.props.navigate} movie={movie}/>
                )
              )
            }
          </TableBody>
        </Table>
      </div>
      );

    return (
      <div>
        {contents}
        <ScrollTop />
      </div>
    );
  }
}

Movies.propTypes = {
  movies: PropTypes.object,
  navigate: PropTypes.func,
  registerListeners: PropTypes.func,
  unregisterListeners: PropTypes.func
};

Movies.defaultProps = {
  movies: {}
};
