// src/js/firebase-auth.js
import app from './firebase-config.js';
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const auth = getAuth(app);

signInAnonymously(auth)
  .then(() => {
    console.log("Anonymous login berjaya");
  })
  .catch((error) => {
    console.error("Ralat login:", error);
  });

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Pengguna log masuk:", user.uid);
    window.currentUID = user.uid;
  }
});
