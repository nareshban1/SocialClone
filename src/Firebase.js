import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const app = firebase.initializeApp({
    apiKey:process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId:process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
    databaseURL:process.env.REACT_APP_FIREBASE_DATABASE
})

export const auth = firebase.auth()
export const provider = new firebase.auth.GoogleAuthProvider();
export const firestore = app.firestore();
export const database = firebase.database();
export const storage = firebase.storage();


export default app

