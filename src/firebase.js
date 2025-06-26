import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCe2FpakHhGHuQGWUQjQb_teJhZvvRm9bI",
  authDomain: "cashbook-foreverprogrammer.firebaseapp.com",
  projectId: "cashbook-foreverprogrammer",
  storageBucket: "cashbook-foreverprogrammer.appspot.com",
  messagingSenderId: "90027315731",
  appId: "1:90027315731:web:1b05e6d003a30891c0e5e6",
};

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();

export { app, db, googleProvider, facebookProvider };
