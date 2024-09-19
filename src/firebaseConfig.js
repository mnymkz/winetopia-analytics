// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDjREBhNxc7XqAqdH8mMNn1Qq-WNenI_F8",
    authDomain: "winetopia-app.firebaseapp.com",
    projectId: "winetopia-app",
    storageBucket: "winetopia-app.appspot.com",
    messagingSenderId: "486717687749",
    appId: "1:486717687749:web:f90aa12dd0d611a5a52dac",
    measurementId: "G-C51RZCQPK4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };
