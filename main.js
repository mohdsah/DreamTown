// main.js
import { initFirebase } from './src/js/firebase-config.js';
import { setupAuth } from './src/js/firebase-auth.js';
import { startGame } from './src/js/game.js';

// Inisialisasi Firebase
const { app, auth, database } = initFirebase();

// Setup auth dan tunggu pengguna login sebelum mula game
setupAuth(auth, (user) => {
  console.log("Pengguna login:", user.email);
  startGame(user, database);
});
