import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { setPostImg } from '../actions';
import firebase from '../utils/firebase';
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import CardTitle from 'material-ui/lib/card/card-title';
import Colors from 'material-ui/lib/styles/colors';
import placeholder from '../../images/mm-fanart.png';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default class NewsItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      image: undefined
    };
  }

  componentWillMount() {
    const { id } = this.props.newItem;
    this.props.registerListeners(id);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      image: nextProps.newItem.image
    });
  }

  componentWillUnmount() {
    const { id } = this.props.newItem;
    this.props.unregisterListeners(id);
  }

  _handleTouchTap(){
    const { newItem, navigate } = this.props;
    const { slug } = newItem;
    setTimeout(() => {
      navigate(`/news/${slug}`);
    }, 200);
  }

  render() {
    const { newItem } = this.props;
    const image  = this.state.image ? this.state.image : placeholder;
    return (
      <Card onTouchTap={() => {this._handleTouchTap();}} style={{margin: '1em'}}>
        <CardTitle
          title={newItem.title}
          titleColor={Colors.deepOrange900}
          titleStyle={{textAlign: 'center', fontSize: '1.5em'}}
          />
        <CardText>
        <img
          style={{width: '10em', float: 'left', margin: '0 1em 1em 0'}}
          alt={newItem.title}
          src={image}
        />
          {newItem.summary}
        </CardText>
      </Card>
    );
  }
}

NewsItem.propTypes = {
  newItem: PropTypes.object,
  navigate: PropTypes.func,
  registerListeners: PropTypes.func.isRequired,
  unregisterListeners: PropTypes.func.isRequired
};

NewsItem.defaultProps = {

};

function mapStateToProps() {
  return {};
}

function registerListeners(dispatch, id) {
  const ref = firebase.child(`images/${id}`);
  ref.on('value', snapshot => dispatch(setPostImg(id, snapshot.val())));
}

function unregisterListeners(id) {
  const ref = firebase.child(`images/${id}`);
  ref.off();
}

function mapDispatchToProps(dispatch) {
  return {
    registerListeners: id => registerListeners(dispatch, id),
    unregisterListeners: id => unregisterListeners(id)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsItem);
