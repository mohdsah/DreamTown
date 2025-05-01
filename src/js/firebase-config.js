// firebase-config.js
// Guna hanya bila anda tak pakai bundler, sesuai untuk Netlify/HTML biasa

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyABbbqTjJ0AQUlOVzv6SJtnjUCAWKjnQK8",
  authDomain: "dreamtowndemo.firebaseapp.com",
  projectId: "dreamtowndemo",
  storageBucket: "dreamtowndemo.firebasestorage.app",
  messagingSenderId: "388188231244",
  appId: "1:388188231244:web:c76651908a0c14f0ee06e9",
  measurementId: "G-YY3JMP7L13",
  databaseURL: "https://dreamtowndemo-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { app, auth, database };
