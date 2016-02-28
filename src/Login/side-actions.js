import firebase from '../utils/firebase';
import { pushState } from 'redux-router';
import { signInSuccess, logOutSuccess } from './actions/creators';
import { userUid } from '../utils';

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

function setDefaultList(userId, desc, title){
  const defaultListsRef = firebase.child(`lists/${userId}`);
  const id = defaultListsRef.push().key();
  defaultListsRef.child(id).set({
    custom: false,
    id,
    title,
    desc,
    slug: title.toLowerCase()
  });
}

export function signIn(authData, dispatch) {
  const defaultLists = [
    { title: 'History', desc: 'A list of watched movies' },
    { title: 'Collection', desc: 'A list of collected movies' },
    { title: 'WatchList', desc: 'A list of pending movies' }
  ];

  const userId = userUid(authData.uid);
  const ref = firebase.child("users").child(userId);
    ref.once('value', function(snap) {
      if (!snap.exists()){
        ref.set({
          avatarUrl: getAvatar(authData),
          displayName: getName(authData),
          userName: userId
        }).then(error => {
          if (error){
            console.error(error);
          }
          defaultLists.forEach(list => setDefaultList(userId, list.desc, list.title));
        });
      }
    });
    dispatch(signInSuccess(authData));
    dispatch(pushState(null, '/news'));
}

export function logOut(dispatch){
  dispatch(pushState(null, '/news'));
  setTimeout(function() {
    firebase.unauth();
    dispatch(logOutSuccess());
  }, 100);
}
