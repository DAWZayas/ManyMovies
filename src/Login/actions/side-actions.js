import firebase from '../../utils/firebase';

export function authDataCallback() {
	const authData = firebase.getAuth();
	if (authData) {
		console.log("User " + authData.uid + " is logged in with " + authData.provider);
	} else {
		console.log("User is logged out");
	}
}

export function registerUser() {
	const isNewUser = true;
	firebase.onAuth(function(authData) {
		if (authData && isNewUser) {
			firebase.child("users").child(authData.uid).set({
			provider: authData.provider,
			name: getName(authData)
			});
		}
	});
}

function getName(authData) {
  switch (authData.provider) {
     case 'twitter':
       return authData.twitter.displayName;
     case 'facebook':
       return authData.facebook.displayName;
     case 'google':
       return authData.google.displayName;
  }
}

export function signInWith(provider){
	firebase.authWithOAuthPopup(provider, function(error, authData = firebase.getAuth()) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);
  }
});
}

