import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBt8YCjTfIsRDeAcMPpqTV5lqi2GdwhCpw",
  authDomain: "spacetime-101.firebaseapp.com",
  projectId: "spacetime-101",
  storageBucket: "spacetime-101.appspot.com",
  messagingSenderId: "103697100368",
  appId: "1:103697100368:web:d5605d09a8ef4bdf7a6b55",
  measurementId: "G-12DVTQJ9P3",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

// const firebaseApp = initializeApp(firebaseConfig);
// const db = getFirestore(firebaseApp);
// const auth = getAuth(firebaseApp);

export { db, auth };
