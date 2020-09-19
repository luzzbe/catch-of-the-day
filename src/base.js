import Rebase from "re-base";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCs6cXupEAJfGEc_DY2RC2JpYa-x64jXtA",
  authDomain: "catch-of-the-day-b6600.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-b6600.firebaseio.com",
  projectId: "catch-of-the-day-b6600",
  storageBucket: "catch-of-the-day-b6600.appspot.com",
  messagingSenderId: "636360311867",
  appId: "1:636360311867:web:faf7dbf8d5a0f458ab881e",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp, base };
