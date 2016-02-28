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

export function signIn(authData, dispatch) {
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
          const defaultListsRef = firebase.child(`lists/${userId}`);
          const historyIdList = defaultListsRef.push().key();
          defaultListsRef.child(historyIdList).set({
            custom: false,
            id: historyIdList,
            title: 'History',
            desc: 'A list of watched movies',
            slug: 'history'
          });
          const watchListIdList = defaultListsRef.push().key();
          defaultListsRef.child(watchListIdList).set({
            custom: false,
            id: watchListIdList,
            title: 'WatchList',
            desc: 'A list of pending movies',
            slug: 'watchlist'
          });
          const collectionIdList = defaultListsRef.push().key();
          defaultListsRef.child(collectionIdList).set({
            custom: false,
            id: collectionIdList,
            title: 'Collection',
            desc: 'A list of collected movies',
            slug: 'collection'
          });
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
