// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
  import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
  import {getDatabase} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC02oNzXbYzsD3bbLY6c7VgN0SbU3zDP_U",
  authDomain: "simstocks-417718.firebaseapp.com",
  projectId: "simstocks-417718",
  storageBucket: "simstocks-417718.appspot.com",
  messagingSenderId: "769226150702",
  appId: "1:769226150702:web:5cab37b5f8059a355ee0bf",
  measurementId: "G-JWD5QGH6R0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

//----- New Registration code start	  
document.getElementById("register").addEventListener("click", function(event) {
  event.preventDefault();
  var name= document.getElementById("yourName").value;
  var email =  document.getElementById("UserEmail").value;
  var password = document.getElementById("UserPassword").value;
  //For new registration
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    const db=getDatabase();
    const reference = ref(db,'users/' + email);
    set(reference,{
      username : name
    });
    console.log(user);
    alert("Registration successfully!!");
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    console.log(errorMessage);
    alert(error);
  });		  		


});
//----- End


// //----- End

// //----- Logout code start	  
// document.getElementById("logout").addEventListener("click", function() {
//   event.preventDefault();
//   signOut(auth).then(() => {
//     // Sign-out successful.
//     console.log('Sign-out successful.');
//     alert('Sign-out successful.');
//     document.getElementById('logout').style.display = 'none';
//   }).catch((error) => {
//     // An error happened.
//     console.log('An error happened.');
//   });		  		  
// });
//----- End

//console.log(app);