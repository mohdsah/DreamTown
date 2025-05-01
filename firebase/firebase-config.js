
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyABbbqTjJ0AQUlOVzv6SJtnjUCAWKjnQK8",
  authDomain: "dreamtowndemo.firebaseapp.com",
  projectId: "dreamtowndemo",
  storageBucket: "dreamtowndemo.appspot.com",
  messagingSenderId: "388188231244",
  appId: "1:388188231244:web:c76651908a0c14f0ee06e9",
  measurementId: "G-YY3JMP7L13",
  databaseURL: "https://dreamtowndemo-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
