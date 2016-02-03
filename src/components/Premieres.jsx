import React, { Component, PropTypes } from 'react';
import PremiereItem from './PremiereItem';
import _ from 'lodash';
import $ from 'jquery';
import { getDocHeight } from '../utils';
import Toggle from 'material-ui/lib/toggle';
import Colors from 'material-ui/lib/styles/colors';
import CircularProgress from 'material-ui/lib/circular-progress';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const PAGE_SIZE = 10;

export default class Premieres extends Component {

  constructor(props) {
    super(props);
    this.state = {
      maxMovies: PAGE_SIZE,
      loadMoreHandler: this._loadMoreOnBottom.bind(this),
      loading: false,
      watchlistFiltering: false,
    };
  }

  componentDidMount(){
    window.addEventListener("scroll", this.state.loadMoreHandler);
  }

  componentWillUnmount(){
    window.removeEventListener("scroll", this.state.loadMoreHandler);
  }

  _handleToggle(e, toggled){
    this.setState({ watchlistFiltering: toggled });
  }

  _loadMoreOnBottom() {
    const listedPremieres = this._getWatchedPremieres.bind(this)();
    if (this.state.maxMovies >= _.keys(listedPremieres).length){
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

  _getWatchedPremieres(){
    const { premieres, watchlistEntries } = this.props;
    const { watchlistFiltering } = this.state;
    return watchlistFiltering ? (
      premieres.filter(premiere => watchlistEntries.indexOf(premiere.ids.trakt.toString()) !== -1)
      ) :
      premieres;
  }

  render() {
    const { navigate, watchlistEntries } = this.props;
    const { maxMovies } = this.state;
    const progress = this.state.loading ?
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <CircularProgress
          mode="indeterminate"
          color={Colors.deepOrange900}
        />
      </div>
      :
      null;
    console.log(watchlistEntries);
    const listedPremieres = this._getWatchedPremieres.bind(this)();
    return (
      <div>
        <Toggle
          onToggle={this._handleToggle.bind(this)}
          style={{padding: '1em 0 0 1em'}}
          labelPosition="right"
          label="Only show in WatchList"/>
        {
          listedPremieres.slice(0, maxMovies).map(premiere => <PremiereItem navigate={navigate} key={premiere.ids.trakt} premiere={premiere}/>)
        }
        {progress}
      </div>
    );
  }
}

Premieres.propTypes = {
  premieres: PropTypes.array,
  watchlistEntries: PropTypes.array,
  navigate: PropTypes.func
};

Premieres.defaultProps = {
  premieres: []
};
