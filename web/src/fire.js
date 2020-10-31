import firebase from 'firebase';     
 // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyA133InxcvBsp6Ir7yf79lyiErxN4ena58",
    authDomain: "maturita-formalita.firebaseapp.com",
    databaseURL: "https://maturita-formalita.firebaseio.com",
    projectId: "maturita-formalita",
    storageBucket: "maturita-formalita.appspot.com",
    messagingSenderId: "587495221582",
    appId: "1:587495221582:web:121fae790c84f3b91a161f",
    measurementId: "G-BYK1NHHDG5"
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default fire;