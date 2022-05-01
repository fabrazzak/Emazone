// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';



// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_JJ92ifTzkBgnGqIY2LU4cswltU3jn_8",
  authDomain: "emazone-bf808.firebaseapp.com",
  projectId: "emazone-bf808",
  storageBucket: "emazone-bf808.appspot.com",
  messagingSenderId: "934578320238",
  appId: "1:934578320238:web:0ea30153b1c24daa1b477f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;