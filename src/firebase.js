import firebase from 'firebase';


const firebaseAppp = firebase.initializeApp({
    apiKey: "AIzaSyBfgIJ5jVhxbPojGVGZBiz-9BvEBNtjXy0",
    authDomain: "react-facebook-messenger.firebaseapp.com",
    databaseURL: "https://react-facebook-messenger.firebaseio.com",
    projectId: "react-facebook-messenger",
    storageBucket: "react-facebook-messenger.appspot.com",
    messagingSenderId: "642511215272",
    appId: "1:642511215272:web:f15ce9f85eee744c86c09d",
    measurementId: "G-D28VX7NK9H"
});

const db = firebaseAppp.firestore();

export default db;