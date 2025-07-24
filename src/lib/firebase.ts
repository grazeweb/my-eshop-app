
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCUc8IyEj7Ij9P7quOxBSqG3R6tiuMyhEg",
  authDomain: "eshop-2da0f.firebaseapp.com",
  projectId: "eshop-2da0f",
  storageBucket: "eshop-2da0f.firebasestorage.app",
  messagingSenderId: "268290998779",
  appId: "1:268290998779:web:5da66df16f33f97de78b5e",
  measurementId: "G-05762PP0KZ"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
