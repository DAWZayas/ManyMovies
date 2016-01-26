import firebase from '../../utils/firebase';
import { signInSuccess, logOutSuccess } from './creators';
import { userUid } from '../../utils';

export function getName(authData) {
  switch (authData.provider) {
     case 'twitter':
       return authData.twitter.displayName;
     case 'facebook':
       return authData.facebook.displayName;
     case 'google':
       return authData.google.displayName;
  }
}

export function signInWith(provider, dispatch){
	firebase.authWithOAuthPopup(provider, function(error, authData = firebase.getAuth()) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    signIn(authData, dispatch);
  }
});
}

export function signIn(authData, dispatch) {
  const userId = userUid(authData.uid);
  if (authData) {
      firebase.child("users").child(userId).set({
        avatarUrl: authData.twitter.profileImageURL,
        displayName: getName(authData),
        userName: authData.twitter.username
      });
      dispatch(signInSuccess(authData));
    } else {
      console.log("Client unauthenticated.");
    }
}

export function logOut(dispatch){
  dispatch(logOutSuccess());
}
