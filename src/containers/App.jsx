import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MovieDetails from '../components/MovieDetails.jsx';
//import Menu from 'material-ui/lib/menus/menu';
const injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

export default class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const style = {
      backgroundColor: 'orange'
    };
    return (
      <div>
        <AppBar title="ManyMovies"
                style={style}
                iconElementLeft={
                  <IconMenu openDirection="bottom-right" iconButtonElement={<IconButton  iconClassName="glyphicon glyphicon-align-justify"/>}>
                        <MenuItem primaryText="Lists" />
                        <MenuItem primaryText="History" />
                        <MenuItem primaryText="Collections" />
                        <MenuItem primaryText="Movies" />
                  </IconMenu>
        }/>
        <MovieDetails />
        <Link to="/lists">Show Lists</Link>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  // Injected by React Router
  children: PropTypes.node
};
