import firebase from '../../utils/firebase';

export function registerListeners(userId, callback) {
  const creatorRef = firebase.child(`users/${userId}`);
  creatorRef.on('value', function(snap){
    callback(snap.val());
  });
}

export function unregisterListeners(userId) {
  const creatorRef = firebase.child(`users/${userId}`);
  creatorRef.off();
}
