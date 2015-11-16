import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconMenu from 'material-ui/lib/menus/icon-menu';
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
<<<<<<< HEAD
                showMenuIconButton={false}
                iconElementRight={
                  <IconMenu openDirection="bottom-left" iconButtonElement={<IconButton  iconClassName="glyphicon glyphicon-align-justify"/>}>
                        <MenuItem primaryText="Lists" / >
                        <MenuItem primaryText="History"  />
                        <MenuItem primaryText="Collections" />
                        <MenuItem primaryText="Movies" onItemTouchTap={<Link to="/movies" />} />
=======
                iconElementLeft={
                  <IconMenu openDirection="bottom-right" iconButtonElement={<IconButton iconClassName="glyphicon glyphicon-align-justify" />}>
                        <MenuItem primaryText="Lists" />
                        <MenuItem primaryText="History" />
                        <MenuItem primaryText="Collections" />
                        <MenuItem primaryText="Movies"  />
>>>>>>> 5de60c406e93c613f41f894bc0c91247a9c22df5
                  </IconMenu>
        }/>
        <Link to="/movie-details">Movie Details</Link> <br />
        <Link to="/lists">Show Lists</Link> <br />
        <Link to="/search">Search movie</Link>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  // Injected by React Router
  children: PropTypes.node
};


