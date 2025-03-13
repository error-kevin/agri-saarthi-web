// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_XYV9-QZ1Flzz0ZmQlmMUVYrSapcRbM0",
  authDomain: "agrisaarthi.firebaseapp.com",
  projectId: "agrisaarthi",
  storageBucket: "agrisaarthi.firebasestorage.app",
  messagingSenderId: "1040283790673",
  appId: "1:1040283790673:web:97e767ff95bdb9ce323770",
  measurementId: "G-VSSPFKY7Q8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
