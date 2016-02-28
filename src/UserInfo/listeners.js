import { setWatchedUser, setWatchedUserFollowers, setWatchedUserFollowing } from './actions/creators';
import { setFollowingUsers } from '../Friends/actions/creators';
import { setLists } from '../Lists/actions/creators';
import firebase from '../utils/firebase';
import { values, isEmpty } from 'lodash';
import { userUid } from '../utils';

export function registerListeners(dispatch, params, auth) {
  const ref = firebase.child(`users/${params.idUser}`);
  ref.on('value', snapshot => dispatch(setWatchedUser(snapshot.val())));
  const refList = firebase.child(`lists/${params.idUser}`);
  refList.on('value', snapshot => dispatch(setLists(values(snapshot.val()))));

  if (!isEmpty(auth)){
    const id = userUid(auth.uid);

    const followingRef = firebase.child(`following/${id}/`);
    followingRef.on('value', snap => {
      const promises = Object.keys(snap.val() || []).map( userId => new Promise(
        resolve => firebase.child(`users/${userId}`).once('value', snapshot => resolve(snapshot.val()))
      ));
      Promise.all(promises).then(following => dispatch(setFollowingUsers(following)));
    });
  }

  const id = params.idUser;
  const followersRef = firebase.child(`followers/${id}/`);
  followersRef.on('value', snap => {
    const promises = Object.keys(snap.val() || []).map( userId => new Promise(
      resolve => firebase.child(`users/${userId}`).once('value', snapshot => resolve(snapshot.val()))
    ));
    Promise.all(promises).then(followers => dispatch(setWatchedUserFollowers(followers)));
  });

  const followingRef = firebase.child(`following/${id}/`);
  followingRef.on('value', snap => {
    const promises = Object.keys(snap.val() || []).map( userId => new Promise(
      resolve => firebase.child(`users/${userId}`).once('value', snapshot => resolve(snapshot.val()))
    ));
    Promise.all(promises).then(following => dispatch(setWatchedUserFollowing(following)));
  });
}

export function unregisterListeners(dispatch, params) {
  const ref = firebase.child(`users/${params.idUser}`);
  const refList = firebase.child(`lists/${params.idUser}`);
  ref.off();
  refList.off();
  dispatch(setWatchedUser({}));
}
