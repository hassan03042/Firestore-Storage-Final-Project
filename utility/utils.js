import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
import {
     getAuth,
     onAuthStateChanged,
     createUserWithEmailAndPassword,
     signInWithEmailAndPassword,
     signOut,
     updateProfile,
     updateEmail,
     updatePassword,
     } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import { 
    getFirestore,
    collection,
    addDoc,
    doc,
    setDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
 } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";
import { 
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,

 } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyA8fhxSvBLYEpCgLAkZRKI-aNPgzS4u7Ok",
    authDomain: "firestore-and-storage.firebaseapp.com",
    projectId: "firestore-and-storage",
    storageBucket: "firestore-and-storage.appspot.com",
    messagingSenderId: "836333377458",
    appId: "1:836333377458:web:22588d1f295696941e76ab",
    measurementId: "G-0TJ908XKF8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {
    auth,
    db, 
    storage,
    getAuth,
    onAuthStateChanged,
    getFirestore,
    getStorage,
    signInWithEmailAndPassword,
    signOut,
    createUserWithEmailAndPassword,
    updateProfile,
    updateEmail,
    updatePassword,
    collection,
    addDoc,
    doc,
    setDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    ref,
    uploadBytes,
    getDownloadURL, 
};