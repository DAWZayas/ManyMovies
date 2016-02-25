import firebase from '../utils/firebase';
import { userUid } from '../utils';

export function editProfile(displayName, avatar) {
	const uid = userUid(firebase.getAuth().uid);
	firebase.child(`users/${uid}`).update({displayName, avatarUrl: avatar});
}
