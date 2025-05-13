// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8f3Iep3pfjbICMHcPXyn4-T48AvxxiPA",
  authDomain: "tuyentx-quiz-firebase.firebaseapp.com",
  projectId: "tuyentx-quiz-firebase",
  storageBucket: "tuyentx-quiz-firebase.firebasestorage.app",
  messagingSenderId: "19636754927",
  appId: "1:19636754927:web:7499fcb9659fa69d5ffe1a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
export { app, auth, db };