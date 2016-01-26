import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';
import Color from 'material-ui/lib/styles/colors';
import poster from '../../images/poster-login.png';

export default class SignIn extends Component {

  constructor(props) {
    super(props);
  }

  handleSignInWithTwitterClick() {
    this.props.signInWith("twitter");
  }

  handleSignInWithFacebookClick() {
    this.props.signInWith("facebook");
  }

  handleSignInWithGoogleClick() {
    this.props.signInWith("google");
  }

  render() {

    return (
        <div style={{textAlign: 'center', margin:'2em auto 2em', display: 'flex', justifyContent: 'center'}}>
        <Card>
          <CardTitle
            title="Welcome to Many Movies"
            titleColor={Color.deepOrange500}
          />
          <img src={poster} style={{margin:'2em'}} alt="manymovies-logo"/>

          <div>
            <FlatButton
              key={1}
              style={{border: '0.2em solid', borderColor: Color.grey400, width: '90%', marginBottom: '0.2em'}}
              labelStyle={{color: Color.lightBlue500}}
              hoverColor={Color.cyan200}
              label="Sign in with Twitter"
              labelPosition="after"
              secondary
              onTouchTap={ () => this.handleSignInWithTwitterClick()}>
              <i style={{color: Color.lightBlue500}} className="fa fa-twitter"/>
              </FlatButton>
          </div>

          <div>
            <FlatButton
              key={2}
              style={{border: '0.2em solid', borderColor: Color.grey400, width: '90%', marginBottom: '0.2em'}}
              hoverColor={Color.blue300}
              label="Sign in with Facebook"
              labelStyle={{color: Color.indigo900}}
              labelPosition="after"
              secondary
              onTouchTap={ () => this.handleSignInWithFacebookClick()}>
              <i style={{color: Color.indigo900}} className="fa fa-facebook"/>
              </FlatButton>
          </div>
          <div>
            <FlatButton
              key={3}
              style={{border: '0.2em solid', borderColor: Color.grey400, width: '90%', marginBottom: '0.2em'}}
              hoverColor={Color.red100}
              label="Sign in with Google"
              labelStyle={{color: Color.red500}}
              labelPosition="after"
              secondary
              onTouchTap={ () => this.handleSignInWithGoogleClick()}>
              <i style={{color: Color.red500}} className="fa fa-google"/>
            </FlatButton>
          </div>
        </Card>
      </div>
    );
  }

}

SignIn.propTypes = {
  signInWith: PropTypes.func
};
