import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import AppBar from 'material-ui/lib/app-bar';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import IconButton from 'material-ui/lib/icon-button';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

class App extends Component {

  constructor(props) {
    super(props);
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
      backgroundColor: 'orange'
    };

    //const { navigate } = this.props;
    return (
      <div>
        <AppBar title="ManyMovies"
                style={style}
                showMenuIconButton={false}
                iconElementRight={
                  <IconMenu
                    openDirection="bottom-left"
                    iconButtonElement={
                      <IconButton
                        iconClassName="glyphicon glyphicon-align-justify"
                      />
                    }
                    >
                      <MenuItem primaryText="Lists" onTouchTap={this._handleTouchTap.bind(this)} / >
                      <MenuItem primaryText="History" onTouchTap={this._handleTouchTap.bind(this)}  />
                      <MenuItem primaryText="Collection" onTouchTap={this._handleTouchTap.bind(this)} />
                      <MenuItem primaryText="WatchList" onTouchTap={this._handleTouchTap.bind(this)} />
                      <MenuItem primaryText="Movies" onTouchTap={this._handleTouchTap.bind(this)} />
                  </IconMenu>}
        />
        <Link to="/movie-details">Movie Details</Link> <br />
        <Link to="/search">Search movie</Link>
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
