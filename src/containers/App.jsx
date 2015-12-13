import React, { Component, PropTypes } from 'react';
import AppBar from 'material-ui/lib/app-bar';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import IconButton from 'material-ui/lib/icon-button';
import Color from 'material-ui/lib/styles/colors';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconMenu from 'material-ui/lib/menus/icon-menu';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class App extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    const { navigate } = this.props;
    if (annyang) {
      const commands = {
        'show movies': function() { navigate('/movies');},
        'show collection': function() { navigate('/lists/collection');},
        'show history': function() { navigate('/lists/history');},
        'show pending': function() { navigate('/lists/watchlist');},
        'show profile': function() { navigate('/profile');},
        'show listing': function() { navigate('/lists');}
      };
      annyang.addCommands(commands);
      annyang.start();
    }
  }

  componentWillUnmount(){
    annyang = null;
  }

  _handleTouchTap(e){
    let path = e.target.innerHTML.toLowerCase();
    switch (path){
      case 'collection':
      case 'history':
      case 'watchlist':
        path = `lists/${path}`;
    }
    this.props.navigate(`/${path}`);
  }

  render() {
    const style = {
      backgroundColor: Color.orange600
    };

    return (
      <div>
        <AppBar
          title="ManyMovies"
          style={style}
          showMenuIconButton={false}
          iconElementRight={
            <IconMenu
              openDirection="bottom-left"
              iconButtonElement={
                <IconButton
                  iconClassName="glyphicon glyphicon-align-justify"/>
              }
            >
              <MenuItem primaryText="Profile" onTouchTap={this._handleTouchTap.bind(this)} />
              <MenuItem primaryText="Lists" onTouchTap={this._handleTouchTap.bind(this)} />
              <MenuItem primaryText="History" onTouchTap={this._handleTouchTap.bind(this)} />
              <MenuItem primaryText="Collection" onTouchTap={this._handleTouchTap.bind(this)} />
              <MenuItem primaryText="WatchList" onTouchTap={this._handleTouchTap.bind(this)} />
              <MenuItem primaryText="Movies" onTouchTap={this._handleTouchTap.bind(this)} />
            </IconMenu>
            }
        />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  // Injected by React Router
  children: PropTypes.node,
  navigate: PropTypes.func
};

const mapStateToProps = () => ({});

function mapDispatchToProps(dispatch) {
  return {
    navigate: path => dispatch(pushState(null, path))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
