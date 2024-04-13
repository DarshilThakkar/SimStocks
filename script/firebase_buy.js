import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import {
getDatabase,
ref,
set,
onValue,
child,
get,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
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
measurementId: "G-JWD5QGH6R0",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export function storestock(){
    console.log(1);
    // stock name : [price,quantity]
    var user = sessionStorage.getItem("username");
    var stock_fetch1 = document.getElementById("stock_fetch").value;
    console.log(stock_fetch1);
    var stock_fetch2=stock_fetch1;
    stock_fetch2=stock_fetch2.toUpperCase();
    console.log(stock_fetch2);
    for (let i = 0; i < products1.length; i++) {
        let companyName = Object.keys(products1[i])[0];
        if (stock_fetch2 === products1[i][companyName]) {
            stock_fetch1=stock_fetch2;
            break;
        }
        if (stock_fetch1 === companyName) {
            stock_fetch1 = products1[i][companyName];
            break;
        }
    }
    const dbRef = ref(getDatabase());
    get(child(dbRef, "users/" + user))
    .then((snapshot) => {
        if (snapshot.exists()) {
            const userData = snapshot.val();
            email = userData[stock_fetch1];
        }
    })};

    // stock_quan
    // change balance
