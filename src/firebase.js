// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD_uD__eGUufdPmgPinYUuwkwjMOVyH7Qw",
  authDomain: "recipe-book-app-d8521.firebaseapp.com",
  projectId: "recipe-book-app-d8521",
  storageBucket: "recipe-book-app-d8521.appspot.com",
  messagingSenderId: "881681738963",
  appId: "1:881681738963:web:822c762d9faec2d5083826"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
