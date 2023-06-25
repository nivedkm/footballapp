import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBDBIPhMcMbA1NlJ3x4yLCt_p4Ge6i2HOo",
  authDomain: "footballapp-53e2b.firebaseapp.com",
  projectId: "footballapp-53e2b",
  storageBucket: "footballapp-53e2b.appspot.com",
  messagingSenderId: "791246788890",
  appId: "1:791246788890:web:49e4ffde03076e47ab34a3",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
