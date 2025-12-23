import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAVEsR5qduq_S5FB28zALRNCFWzz4Ee9CM",
  authDomain: "bakery-project-78945.firebaseapp.com",
  projectId: "bakery-project-78945",
  storageBucket: "bakery-project-78945.firebasestorage.app",
  messagingSenderId: "646993910044",
  appId: "1:646993910044:web:9426277de48f7c60d1c2d9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
