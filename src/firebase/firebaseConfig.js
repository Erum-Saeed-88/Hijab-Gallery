import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 🔧 REPLACE these with your actual Firebase project values
const firebaseConfig = {
  apiKey: "AIzaSyCD0lRYOuel0R2uKwKppQNcnh-KAsu1OnM",
  authDomain: "hijab-gallery16.firebaseapp.com",
  projectId: "hijab-gallery16",
  storageBucket: "hijab-gallery16.firebasestorage.app",
  messagingSenderId: "26129858538",
  appId: "1:26129858538:web:2d559a7ead3815b31efc93",
  measurementId: "G-WY03NNX3D8"
};

// Prevent re-initialization during hot reload
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db   = getFirestore(app);
export default app;
