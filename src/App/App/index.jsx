import React, { Component, PropTypes } from 'react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import Color from 'material-ui/lib/styles/colors';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import { isEmpty } from 'lodash';
import { userUid } from '../../utils';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default class App extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount(){
    const { registerListeners, auth } = this.props;
    auth.uid && registerListeners(userUid(auth.uid));
  }

  componentWillReceiveProps(nextProps){
    const { registerListeners, unregisterListeners, auth } = this.props;
    if (nextProps.auth.uid !== auth.uid){
      auth.uid && unregisterListeners(userUid(auth.uid));
      nextProps.auth.uid && registerListeners(userUid(nextProps.auth.uid));
    }
  }

  componentWillUnmount(){
    const { unregisterListeners, auth } = this.props;
    auth.uid && unregisterListeners(userUid(auth.uid));
  }

  _handleTouchTap(e){
    const path = e.target.innerHTML.toLowerCase().replace(' ', '');
    if (path === 'logout'){
      this.props.logOut();
    } else {
      this.props.navigate(`/${path}`);
    }
  }

  _getMenuItem(text){
    return <MenuItem key={text} style={{padding: '0 1.5em'}} primaryText={text} onTouchTap={this._handleTouchTap.bind(this)} />;
  }

  render() {
    const { auth, user } = this.props;
    const style = {
      backgroundColor: Color.orange600
    };
    const topMenuElements = ['News', 'Movies', 'Premieres'];
    const loggedElements = ['Log Out', 'Profile'];

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
              {
                topMenuElements.map(element => this._getMenuItem(element))
              }
              { !isEmpty(auth) ?
              <div>
                { this._getMenuItem('Lists') }
                <hr style={{
                  margin: '-1 0 0 0',
                  height: 1,
                  border: 'none',
                  backgroundColor: Color.grey300
                }}/>
                {
                  loggedElements.map(element => this._getMenuItem(element))
                }
              </div>
              :
              <div>
                <hr style={{
                    margin: '-1 0 0 0',
                    height: 1,
                    border: 'none',
                    backgroundColor: Color.grey300
                  }}/>
                { this._getMenuItem('Sign In') }
              </div>
              }
              { user.admin ?
                this._getMenuItem('Admin') :
                <div></div>
              }
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
  logOut: PropTypes.func,
  auth: PropTypes.object,
  user: PropTypes.object,
  children: PropTypes.node,
  navigate: PropTypes.func,
  registerListeners: PropTypes.func,
  unregisterListeners: PropTypes.func
};

App.defaultProps = {
  user: {}
};
