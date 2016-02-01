import firebase from '../../utils/firebase';
import { signInSuccess, logOutSuccess, editUser } from './creators';
import { userUid } from '../../utils';

export const getName = authData => authData[authData.provider].displayName;

export const getAvatar = authData => authData[authData.provider].profileImageURL;

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
  const ref = firebase.child("users").child(userId);
    ref.once('value', function(snap) {
      if (!snap.exists()){
        ref.set({
          avatarUrl: getAvatar(authData),
          displayName: getName(authData),
          userName: userId
        });
      }
    });
    dispatch(signInSuccess(authData));
}

export function logOut(dispatch){
  dispatch(logOutSuccess());
}

export function editProfile(authData = firebase.getAuth(), displayName, dispatch) {
  debugger;
  const userId = userUid(authData.uid);
  const ref = firebase.child("users").child(userId);
  ref.set({
    displayName: displayName
  });
  dispatch(editUser(displayName));
}
