// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBZQbAYIsg_F_JIaLAulZKd0_mUM6jRXqY",
    authDomain: "test-314c9.firebaseapp.com",
    projectId: "test-314c9",
    storageBucket: "test-314c9.firebasestorage.app",
    messagingSenderId: "228304607579",
    appId: "1:228304607579:web:99ee5af6ce14cd4a89a27e",
    measurementId: "G-P6ENT122PM",
    databaseURL: "https://washroom-c736e-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);