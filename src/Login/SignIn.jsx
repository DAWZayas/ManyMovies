import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import Color from 'material-ui/lib/styles/colors';
import { capitalize } from 'lodash';
import poster from '../../images/mm-fanart-login.png';

export default class SignIn extends Component {

  constructor(props) {
    super(props);
  }

  handleSignInWith(provider) {
    this.props.signInWith(provider);
  }

  _getProviderButton(provider, color, hoverColor){
    return (<FlatButton
          key={provider}
          style={{textAlign: 'left', border: '0.2em solid', borderColor: Color.grey400, width: '90%', marginBottom: '0.2em'}}
          labelStyle={{color: color}}
          hoverColor={hoverColor}
          label={`Sign in with ${capitalize(provider)}`}
          labelPosition="after"
          onTouchTap={ () => this.handleSignInWith(provider)}>
          <i style={{marginLeft: '3em', color: color}} className={`fa fa-${provider}`}/>
        </FlatButton>);
  }

  render() {
    const providers = [
      { provider: 'twitter', color: Color.lightBlue500, hoverColor: Color.cyan200},
      { provider: 'facebook', color: Color.blue300, hoverColor: Color.indigo900},
      { provider: 'google', color: Color.red500, hoverColor: Color.red100}
    ];

    return (
      <Card style={{textAlign: 'center', margin:'2em auto 2em', display: 'flex', justifyContent: 'center', padding: '0 0 4em 0'}}>
        <CardTitle
          title="Welcome to Many Movies"
          titleColor={Color.deepOrange500}
        />
        <CardText>
          <img src={poster} style={{margin:'2em', height: '13em'}} alt="manymovies-logo"/>
        </CardText>
        {
          providers.map(provider => this._getProviderButton(provider.provider, provider.color, provider.hoverColor))
        }
      </Card>
    );
  }

}

SignIn.propTypes = {
  signInWith: PropTypes.func
};
