import Rebase from 're-base'; //React firebase specific package that lets us mirror our state to our firebase changes
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBlxx1cshYAca7Bp3P_K9oYYt4s4VWORxI",
    authDomain: "catch-of-the-day-justin-r.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-justin-r-default-rtdb.firebaseio.com"
    /*projectId: "catch-of-the-day-justin-r",
    storageBucket: "catch-of-the-day-justin-r.appspot.com",
    messagingSenderId: "1018375598399",
    appId: "1:1018375598399:web:ec60100359d0e7c361638a",
    measurementId: "G-YYR116YQDD"*/
});
//firebase.analytics();

//rebase bindings
const base = Rebase.createClass(firebaseApp.database())

//this is a named export
export { firebaseApp };

//this is a default export
export default base;