// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDl0J4n_plOe3jmGKNYNudiWSdsesFeZDA",
  authDomain: "financely-21051.firebaseapp.com",
  projectId: "financely-21051",
  storageBucket: "financely-21051.appspot.com",
  messagingSenderId: "181196760015",
  appId: "1:181196760015:web:773c99a0d9a17ef0f028ba",
  measurementId: "G-LHZQF80LWY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };