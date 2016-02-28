import firebase from '../utils/firebase';

export function followUser(ownId, userId) {
  const followingRef = firebase.child(`following/${ownId}/${userId}`);
  const followersRef = firebase.child(`followers/${userId}/${ownId}`);
  followingRef.set(userId).then(() => followersRef.set(ownId));
}

export function unfollowUser(ownId, userId) {
  const followingRef = firebase.child(`following/${ownId}/${userId}`);
  const followersRef = firebase.child(`followers/${userId}/${ownId}`);
  followingRef.remove().then(() => followersRef.remove());
}

