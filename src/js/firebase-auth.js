import app from "./firebase-config.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const auth = getAuth(app);

const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const logoutBtn = document.getElementById("logoutBtn");
const loginPanel = document.getElementById("loginPanel");
const gamePanel = document.getElementById("gamePanel");
const statusText = document.getElementById("loginStatus");

if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    signInWithEmailAndPassword(auth, email, password)
      .then(() => location.reload())
      .catch(err => {
        statusText.textContent = "Login gagal: " + err.message;
      });
  });
}

if (registerBtn) {
  registerBtn.addEventListener("click", () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => location.reload())
      .catch(err => {
        statusText.textContent = "Daftar gagal: " + err.message;
      });
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => location.reload());
  });
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    loginPanel.style.display = "none";
    gamePanel.style.display = "block";
  } else {
    loginPanel.style.display = "block";
    gamePanel.style.display = "none";
  }
});

export { auth };
