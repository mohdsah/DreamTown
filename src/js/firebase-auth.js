// firebase-auth.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { firebaseConfig } from "./firebase-config.js"; // Pastikan config ini wujud

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Fungsi daftar pengguna baru
export function registerUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

// Fungsi login pengguna
export function loginUser(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

// Fungsi logout
export function logoutUser() {
  return signOut(auth);
}

// Fungsi pantau status login
export function onUserStateChanged(callback) {
  onAuthStateChanged(auth, callback);
}
