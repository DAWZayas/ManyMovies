import firebase from '../utils/firebase';
import { pushState } from 'redux-router';
import { signInSuccess, logOutSuccess } from './actions/creators';
import { userUid } from '../utils';
//import { setLists } from '../Lists/actions/creators';
//import { values } from 'lodash';

const getName = authData => authData[authData.provider].displayName;

const getAvatar = authData => authData[authData.provider].profileImageURL;

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
        // Todo create default lists
        //const defaultListsRef = firebase.child(`lists/${userId}`);
        //defaultListsRef.on('value', snapshot => dispatch(setLists(values(snapshot.val()))));
      }
    });
    dispatch(signInSuccess(authData));
    dispatch(pushState(null, '/news'));
}

export function logOut(dispatch){
  dispatch(logOutSuccess());
  dispatch(pushState(null, '/news'));
}
