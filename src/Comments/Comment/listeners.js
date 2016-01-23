import firebase from '../../utils/firebase';

export function registerListeners(userId, component) {
  const creatorRef = firebase.child(`users/${userId}`);
  creatorRef.on('value', function(snap){
    component.setState({ creator: snap.val()});
  });
}

export function unregisterListeners(userId) {
  const creatorRef = firebase.child(`users/${userId}`);
  creatorRef.off();
}
