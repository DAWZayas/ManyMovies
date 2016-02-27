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
    this.props.registerListeners(this.state.page);
  }

  componentDidMount(){
    window.addEventListener("scroll", this.state.loadMoreHandler);
  }

  componentWillReceiveProps() {
    this.setState({ loading: false, loadingMore: false });
  }

  componentWillUpdate(nextProps, nextState){
    if (!isEqual(this.state, nextState) && !this.state.loading) {
      this.props.registerListeners(nextState.page);
    }
  }

  componentWillUnmount(){
    this.props.unregisterListeners();
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
    const { navigate, premieres } = this.props;
    const progress = this.state.loading ?
      <Spinner/>
      :
      null;
    return (
      <div>
        {
          values(premieres).map(premiere => <PremiereItem navigate={navigate} key={premiere.ids.trakt} premiere={premiere}/>)
        }
        {progress}
      </div>
    );
  }
}

Premieres.propTypes = {
  premieres: PropTypes.object,
  navigate: PropTypes.func,
  registerListeners: PropTypes.func,
  unregisterListeners: PropTypes.func
};

Premieres.defaultProps = {
  premieres: [],
  watchlistEntries: []
};
