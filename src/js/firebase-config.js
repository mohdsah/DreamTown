// Firebase Config
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyABbbqTjJ0AQUlOVzv6SJtnjUCAWKjnQK8",
  authDomain: "dreamtowndemo.firebaseapp.com",
  databaseURL: "https://dreamtowndemo-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dreamtowndemo",
  storageBucket: "dreamtowndemo.firebasestorage.app",
  messagingSenderId: "388188231244",
  appId: "1:388188231244:web:c76651908a0c14f0ee06e9",
  measurementId: "G-YY3JMP7L13"
};

const app = initializeApp(firebaseConfig);
export default app;
