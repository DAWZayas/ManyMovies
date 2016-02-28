import React, { Component, PropTypes } from 'react';
import PremiereItem from './PremiereItem';
import { isEqual, values } from 'lodash';
import $ from 'jquery';
import { getDocHeight } from '../../utils';
import Spinner from '../../Widgets/Spinner';

export default class Premieres extends Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      loading: true,
      loadMoreHandler: this._loadMoreOnBottom.bind(this)
    };
  }

  componentWillMount(){
    const { registerListeners, auth } = this.props;
    registerListeners(this.state.page, auth);
  }

  componentDidMount(){
    window.addEventListener("scroll", this.state.loadMoreHandler);
  }

  componentWillReceiveProps() {
    this.setState({ loading: false, loadingMore: false });
  }

  componentWillUpdate(nextProps, nextState){
    const { registerListeners } = this.props;
    if (!isEqual(this.state, nextState) && !this.state.loading) {
      registerListeners(nextState.page);
    }
  }

  componentWillUnmount(){
    const { unregisterListeners, auth } = this.props;
    unregisterListeners(auth);
    window.removeEventListener("scroll", this.state.loadMoreHandler);
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
    const { navigate, premieres, wishedMovies, addEntry, removeEntry, auth } = this.props;
    const progress = this.state.loading ?
      <Spinner/>
      :
      null;
    return (
      <div>
        {
          values(premieres).map(premiere => <PremiereItem auth={auth} addEntry={addEntry} removeEntry={removeEntry} wishedMovies={wishedMovies} navigate={navigate} key={premiere.ids.trakt} premiere={premiere}/>)
        }
        {progress}
      </div>
    );
  }
}

Premieres.propTypes = {
  premieres: PropTypes.object,
  navigate: PropTypes.func,
  wishedMovies: PropTypes.object,
  registerListeners: PropTypes.func,
  unregisterListeners: PropTypes.func,
  addEntry: PropTypes.func,
  removeEntry: PropTypes.func,
  auth: PropTypes.object
};

Premieres.defaultProps = {
  premieres: [],
  watchlistEntries: []
};
