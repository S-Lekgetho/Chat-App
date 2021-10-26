import firebase from "firebase";



const firebaseConfig = {
    apiKey: "AIzaSyCqXL1kJFPrr8FyK1vVR4gfFOKIJK8rp38",
    authDomain: "chat-app-a42c3.firebaseapp.com",
    projectId: "chat-app-a42c3",
    storageBucket: "chat-app-a42c3.appspot.com",
    messagingSenderId: "5266873500",
    appId: "1:5266873500:web:2841677c8cc458dcfa2159"
  };

  
// Initialize Firebase
let app;

if(firebase.apps.length===0) {
    app = firebase.initializeApp(firebaseConfig);
}else{
    app = firebase.app()
}

const auth = firebase.auth();
const db = app.firestore();
export {auth, db};