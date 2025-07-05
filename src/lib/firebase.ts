
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAphTq4UBFisjQwlP0w3fcBYdOXHJA-9GU",
  authDomain: "eshop-6ef9a.firebaseapp.com",
  projectId: "eshop-6ef9a",
  storageBucket: "eshop-6ef9a.firebasestorage.app",
  messagingSenderId: "573487507395",
  appId: "1:573487507395:web:d59bbb3ea3333d736bff76",
  measurementId: "G-XZXWPLP18T"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
