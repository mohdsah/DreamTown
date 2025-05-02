// Import modul Firebase Auth
import { registerUser, loginUser, logoutUser, onUserStateChanged } from './js/firebase/firebase-auth.js';

// DOM element references
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const logoutBtn = document.getElementById("logoutBtn");
const statusText = document.getElementById("statusText");

// Event: Daftar pengguna baru
registerBtn.addEventListener("click", () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  registerUser(email, password);
});

// Event: Login pengguna
loginBtn.addEventListener("click", () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  loginUser(email, password);
});

// Event: Logout
logoutBtn.addEventListener("click", () => {
  logoutUser();
});

// Listener: Perubahan status login
onUserStateChanged((user) => {
  if (user) {
    console.log("User logged in:", user.email);
    statusText.innerText = `Logged in as: ${user.email}`;
    showGameUI();
  } else {
    console.log("User logged out");
    statusText.innerText = "Not logged in";
    showLoginUI();
  }
});

// Papar UI untuk login
function showLoginUI() {
  document.getElementById("loginPanel").style.display = "block";
  document.getElementById("gamePanel").style.display = "none";
}

// Papar UI untuk permainan
function showGameUI() {
  document.getElementById("loginPanel").style.display = "none";
  document.getElementById("gamePanel").style.display = "block";
}

// Mula dengan semak status login
showLoginUI();
