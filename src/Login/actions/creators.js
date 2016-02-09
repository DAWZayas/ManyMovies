import { INIT_USER, SIGN_IN_SUCCESS, LOG_OUT_SUCCESS } from './constants';
import firebase from '../../utils/firebase';

export const initUser = () => ({
	type: INIT_USER,
	authData: firebase.getAuth(),
	meta: {
		timestamp: Date.now()
	}
});

export const signInSuccess = authData => ({
	type: SIGN_IN_SUCCESS,
	authData,
	meta:{
		timestamp:Date.now()
	}
});

export const logOutSuccess = () => ({type: LOG_OUT_SUCCESS});
