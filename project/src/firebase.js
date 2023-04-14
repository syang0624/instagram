import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseApp = initializeApp({
    apiKey: "AIzaSyBDEggWn3hd-sSf_pm0Ps6NW92TxtIi9t0",
    authDomain: "instagram-7dfcc.firebaseapp.com",
    projectId: "instagram-7dfcc",
    storageBucket: "instagram-7dfcc.appspot.com",
    messagingSenderId: "122594679509",
    appId: "1:122594679509:web:b305877bf77521132be05c",
    measurementId: "G-GPF82T5S1P"
});

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

export { db, auth, storage };