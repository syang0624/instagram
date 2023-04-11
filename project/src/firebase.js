// import firebase from "firebase";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBDEggWn3hd-sSf_pm0Ps6NW92TxtIi9t0",
    authDomain: "instagram-7dfcc.firebaseapp.com",
    projectId: "instagram-7dfcc",
    storageBucket: "instagram-7dfcc.appspot.com",
    messagingSenderId: "122594679509",
    appId: "1:122594679509:web:b305877bf77521132be05c",
    measurementId: "G-GPF82T5S1P"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storate();

export { db, auth, storage };