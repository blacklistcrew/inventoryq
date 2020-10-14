import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Set the configuration for your app
const config = {
  apiKey: 'AIzaSyAHjM45qfMUOr7IwEEchFjl2eZkVOFzjrY',
  authDomain: 'inventoryku-20cbd.firebaseapp.com',
  databaseURL: 'https://inventoryku-20cbd.firebaseio.com',
  storageBucket: 'inventoryku-20cbd.appspot.com',
};
firebase.initializeApp(config);

// Get a reference to the database service
// const database = firebase.database();

export default firebase;
