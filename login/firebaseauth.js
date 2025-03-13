import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCIRMOE6alVOLaHt2NY8IYkHcBFl6R6gx4",
    authDomain: "loginsignup-abd95.firebaseapp.com",
    projectId: "loginsignup-abd95",
    storageBucket: "loginsignup-abd95.firebasestorage.app",
    messagingSenderId: "770114401210",
    appId: "1:770114401210:web:b088f96762a3a8a8e62383"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, setDoc, doc };