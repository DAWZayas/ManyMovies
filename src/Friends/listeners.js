import { setFollowerUsers, clearFollowers, setFollowingUsers, clearFollowing, setWatchedPeople } from './actions/creators';
import firebase from '../utils/firebase';

export function registerListeners(dispatch, id) {
  dispatch(setWatchedPeople([]));
  const followersRef = firebase.child(`followers/${id}/`);
  followersRef.on('value', snap => {
    const promises = Object.keys(snap.val() || []).map( userId => new Promise(
      resolve => firebase.child(`users/${userId}`).once('value', snapshot => resolve(snapshot.val()))
    ));
    Promise.all(promises).then(followers => dispatch(setFollowerUsers(followers)));
  });

  const followingRef = firebase.child(`following/${id}/`);
  followingRef.on('value', snap => {
    const promises = Object.keys(snap.val() || []).map( userId => new Promise(
      resolve => firebase.child(`users/${userId}`).once('value', snapshot => resolve(snapshot.val()))
    ));
    Promise.all(promises).then(following => dispatch(setFollowingUsers(following)));
  });
}

export function unregisterListeners(dispatch, id) {
  const followersRef = firebase.child(`followers/${id}/`);
  const followingRef = firebase.child(`following/${id}/`);
  followersRef.off();
  followingRef.off();
  dispatch(clearFollowers());
  dispatch(clearFollowing());
}
