import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDRgp-vcfdRKg5Y6drBQFvXLUBo1TKdPHw",
    authDomain: "proyect2-prog3.firebaseapp.com",
    projectId: "proyect2-prog3",
    storageBucket: "proyect2-prog3.appspot.com",
    messagingSenderId: "329151135303",
    appId: "1:329151135303:web:d3c2d7a911a2308810bb62"
  };
app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();