import React, { Component, PropTypes } from 'react';
import { isEqual } from 'lodash';
import RaisedButton from 'material-ui/lib/raised-button';
import Paper from 'material-ui/lib/paper';
import ScrollTop from '../../Widgets/ScrollTop';
import FontIcon from 'material-ui/lib/font-icon';
import TextField from 'material-ui/lib/text-field';
import Spinner from '../../Widgets/Spinner';
import MoviesTable from './MoviesTable';
import $ from 'jquery';
import { getDocHeight } from '../../utils';
import { debounce } from 'lodash';

const styles = {
  paper: { padding: '1em 1em 2em 1em' },
  container: { display: 'flex', justifyContent: 'center' },
  fontIcon: { lineHeight: '2em' },
  textInput: { flexGrow: '20' }
};

export default class Movies extends Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      searchTerm: '',
      loading: true,
      loadMoreHandler: this._loadMoreOnBottom.bind(this),
    };
  }

  componentWillMount(){
    this.props.registerListeners(this.state.searchTerm, this.state.page);
  }

  componentDidMount(){
    window.addEventListener("scroll", this.state.loadMoreHandler);
  }

  componentWillReceiveProps() {
    this.setState({ loading: false, loadingMore: false });
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

  _handleGenreSearcher(){
    setTimeout(() => {
      this.props.navigate('/byGenre/');
    }, 200);
  }

  _loadMoreOnBottom() {
    if ($(window).scrollTop() + $(window).height() > getDocHeight() - 15) {
      setTimeout(() => {
         this.setState({page: this.state.page + 1, loadingMore: true});
        }
        , 0);
    }
  }

  render() {
    const contents = this.state.loading ?
      <Spinner/>
      :
      (<div>
        <Paper style={styles.paper}>
          <div style={styles.container}>
            <FontIcon style={styles.fontIcon} className="material-icons">search</FontIcon>
            <TextField
              ref="search"
              style={styles.textInput}
              hintText="Search a movie"
              onChange={debounce(this._handleSearchChange.bind(this), 300)}
              onFocus={this._handleSearchFocus.bind(this)}
              onKeyDown={this._handleKeyDown.bind(this)}
            />
          </div>
          <div style={styles.container}>
            <RaisedButton
              label="Search by genre"
              onTouchTap={this._handleGenreSearcher.bind(this)}
            />
          </div>
        </Paper>
        <MoviesTable {...this.props}/>
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
  navigate: PropTypes.func,
  registerListeners: PropTypes.func,
  unregisterListeners: PropTypes.func
};
