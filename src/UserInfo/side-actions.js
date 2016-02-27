import firebase from '../utils/firebase';

export function sendMessage(userName, message, userId, callback){
	firebase.child(`messages/${userId}`).push({userName, message})
		.then(
			callback,
			error => console.error(error)
			);
}
