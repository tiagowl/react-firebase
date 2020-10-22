import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

let firebaseConfig = {
    apiKey: "AIzaSyBdKkH_-Jalrr-RRz13dNznO_M2gQPeMPw",
    authDomain: "reactfirebase-8d84d.firebaseapp.com",
    databaseURL: "https://reactfirebase-8d84d.firebaseio.com",
    projectId: "reactfirebase-8d84d",
    storageBucket: "reactfirebase-8d84d.appspot.com",
    messagingSenderId: "177217480094",
    appId: "1:177217480094:web:36c4fbd3d27c8b030d628f",
    measurementId: "G-0ZWG6X1B4Z"
  };
  // Initialize Firebase
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
  }

  export default firebase;