import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAqcQs1zQ2pe11IJgQUzgszBOziY-_j4UQ",
  authDomain: "civic-connect-92ec3.firebaseapp.com",
  projectId: "civic-connect-92ec3",
  storageBucket: "civic-connect-92ec3.appspot.com",
  messagingSenderId: "858209499484",
  appId: "1:858209499484:web:b215c9eaef1e2753f8e999",
  measurementId: "G-HFWP263BY5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const imageDb = getStorage(app);
export { db, app, auth, imageDb };
