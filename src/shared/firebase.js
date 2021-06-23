import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database"; //realtime-database
import "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAG3ScG3MRWvKTbkaj30IvLc3URin7byrA",
  authDomain: "instagram-react-daeun.firebaseapp.com",
  databaseURL: "https://instagram-react-daeun-default-rtdb.firebaseio.com",
  projectId: "instagram-react-daeun",
  storageBucket: "instagram-react-daeun.appspot.com",
  messagingSenderId: "955638862554",
  appId: "1:955638862554:web:cc65036f60da28c9eecbe3",
  measurementId: "G-0X1DC60CMN",
};

firebase.initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();
const realtime = firebase.database();
const analytics = firebase.analytics();

export { apiKey, auth, firestore, storage, realtime, analytics };
