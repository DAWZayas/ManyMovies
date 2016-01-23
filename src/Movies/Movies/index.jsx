import React, { Component, PropTypes } from 'react';
import { isEqual, values } from 'lodash';
import Table from 'material-ui/lib/table/table';
import TableBody from 'material-ui/lib/table/table-body';
import Paper from 'material-ui/lib/paper';
import ScrollTop from '../../Widgets/ScrollTop';
import FontIcon from 'material-ui/lib/font-icon';
import TextField from 'material-ui/lib/text-field';
import Spinner from '../../Widgets/Spinner';
import MovieRow from './MovieRow';
import MoviesListHeader from './MoviesListHeader';
import $ from 'jquery';
import { getDocHeight } from '../../utils';
import { debounce } from 'lodash';

export default class Movies extends Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      searchTerm: '',
      loading: true,
      loadMoreHandler: this._loadMoreOnBottom.bind(this)
    };
  }

  componentWillMount(){
    this.props.registerListeners(this.state.searchedTerm, this.state.page);
  }

  componentDidMount(){
    window.addEventListener("scroll", this.state.loadMoreHandler);
  }

  componentWillReceiveProps() {
    this.setState({ loading: false });
  }

  componentWillUpdate(nextProps, nextState){
    if (!isEqual(this.state, nextState) && !this.state.loading) {
      this.props.registerListeners(nextState.searchTerm, nextState.page);
    }
  }

  componentWillUnmount(){
    this.props.unregisterListeners();
    window.removeEventListener("scroll", this.state.loadMoreHandler);
  }

  _handleKeyDown(e){
    if (e.keyCode === 27){
      this.refs.search.clearValue();
      this.refs.search.blur();
      this.setState({ searchTerm: '', page: 0 });
    }
  }

  _handleSearchFocus(){
    this.refs.search.clearValue();
    this.setState({ searchTerm: '' });
  }

  _handleSearchChange(){
    const searchTerm = this.refs.search.getValue();
    this.setState({ searchTerm, page: 0 });
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
    const contents = this.state.loading ?
      <Spinner/>
      :
      (<div>
        <Paper style={{padding: '1em 1em 2em 1em'}}>
          <div style={{display: "flex", justifyContent: "center"}}>
            <FontIcon style={{lineHeight: "2em"}} className="material-icons">search</FontIcon>
            <TextField
              ref="search"
              style={{flexGrow: "20"}}
              hintText="Search a movie"
              onChange={debounce(this._handleSearchChange.bind(this), 300)}
              onFocus={this._handleSearchFocus.bind(this)}
              onKeyDown={this._handleKeyDown.bind(this)}
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
