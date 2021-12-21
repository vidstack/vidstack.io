import * as firebase from 'firebase-admin';

export default !firebase.apps.length
	? firebase.initializeApp({
			credential: firebase.credential.cert({
				clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
				projectId: process.env.FIREBASE_PROJECT_ID,
				privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
			}),
	  })
	: firebase.app();
