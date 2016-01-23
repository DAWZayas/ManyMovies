import firebase from '../utils/firebase';
//import { setAuthData } from './actions/creators';

export function registerListeners() {
	const ref = firebase.child('/');
	//ref.onAuth(authData => dispatch(setAuthData(authData.val())));
	ref.onAuth(function(authData) {
		if (authData) {
			console.log("Authenticated with uid:", authData.uid);
		} else {
			console.log("Client unauthenticated.");
		}
	});
}

export function unregisterListeners() {
	firebase.offAuth(function(authData) {
		if (authData) {
			console.log("Authenticated with uid:", authData.uid);
		} else {
			console.log("Client unauthenticated.");
		}
	});
}
