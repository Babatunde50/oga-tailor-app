import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyD4ghuxRKocYVVuPEJ4gU1Qy24jPm5WbZ8',
	authDomain: 'oga-tailor.firebaseapp.com',
	databaseURL: 'https://oga-tailor.firebaseio.com',
	projectId: 'oga-tailor',
	storageBucket: 'oga-tailor.appspot.com',
	messagingSenderId: '398388532111',
	appId: '1:398388532111:web:cf86afa1813963a99331fa',
	measurementId: 'G-0JVQEK0SSW',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const auth = firebase.auth();

// setting up google sign in and sign out
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

// setting up facebook sign in
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const signInWithFacebook = () => auth.signInWithPopup(facebookProvider);


// sign out
export const signOut = () => auth.signOut();

export const createUserProfileDocument = async (user, additionalData) => {
	if (!user) return;

	// Get a reference to the place in the database where the data exists
	const userRef = firestore.doc(`users/${user.uid}`);

	// Go and fetch the document from that location
	const snapshot = await userRef.get();

	if (!snapshot.exists) {
		const { displayName, email, photoURL } = user;
		const createdAt = new Date();
		try {
			await userRef.set({
				displayName,
				email,
				photoURL,
				createdAt,
				...additionalData,
			});
		} catch (err) {
			console.error('Error creating user ' + err.message);
		}
	}

	return getUserDocument(user.uid);
};

export const getUserDocument = async uid => {
	if (!uid) return null;
	try {
		return firestore.collection(`users`).doc(uid);
	} catch (err) {
		console.error('Error Fetching User ' + err.message);
	}
};

export default firebase;
