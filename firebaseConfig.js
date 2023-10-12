// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDZ7-eT2vfSYJ3tsj5GOtmEoC2huNHPbQ",
  authDomain: "grw-mobile-ap.firebaseapp.com",
  projectId: "grw-mobile-ap",
  storageBucket: "grw-mobile-ap.appspot.com",
  messagingSenderId: "465174554651",
  appId: "1:465174554651:web:7a8806d94f3b06e7fbf0be"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);