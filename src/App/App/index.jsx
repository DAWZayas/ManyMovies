import React, { Component, PropTypes } from 'react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import Color from 'material-ui/lib/styles/colors';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import { isEmpty } from 'lodash';

export default class App extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    const { navigate } = this.props;
    if (annyang) {
      const commands = {
        'movies': function() { navigate('/movies');},
        'profile': function() { navigate('/profile');},
        'listing': function() { navigate('/lists');},
        'coming': function() { navigate('/premieres');},
        'news': function() { navigate('/news');}
      };
      annyang.addCommands(commands);
      annyang.start();
    }
  }

  componentWillUnmount(){
    annyang = null;
  }

  _handleTouchTap(e){
    let path = e.target.innerHTML.toLowerCase().replace(' ', '');
    this.props.navigate(`/${path}`);
  }

  _handleLogOutClick(){
    this.props.logOut();
  }

  render() {
    const style = {
      backgroundColor: Color.orange600
    };

    const { auth } = this.props;

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
               {(!isEmpty(auth)) ? <MenuItem style={{padding: '0 1.5em'}} primaryText="Log out" onTouchTap={this._handleLogOutClick.bind(this)} /> : <MenuItem style={{padding: '0 1.5em'}} primaryText="Sign in" onTouchTap={this._handleTouchTap.bind(this)} /> }
              <MenuItem style={{padding: '0 1.5em'}} primaryText="News" onTouchTap={this._handleTouchTap.bind(this)} />
              <MenuItem style={{padding: '0 1.5em'}} primaryText="Profile" onTouchTap={this._handleTouchTap.bind(this)} />
              <MenuItem style={{padding: '0 1.5em'}} primaryText="Lists" onTouchTap={this._handleTouchTap.bind(this)} />
              <MenuItem style={{padding: '0 1.5em'}} primaryText="Movies" onTouchTap={this._handleTouchTap.bind(this)} />
              <MenuItem style={{padding: '0 1.5em'}} primaryText="Premieres" onTouchTap={this._handleTouchTap.bind(this)} />
            </IconMenu>
            }
        />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
  navigate: PropTypes.func,
  logOut: PropTypes.func,
  auth: PropTypes.object
};
