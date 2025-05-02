import app from "./src/js/firebase-config.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const auth = getAuth(app);

// Element
const loginPanel = document.getElementById("loginPanel");
const gamePanel = document.getElementById("gamePanel");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const logoutBtn = document.getElementById("logoutBtn");

// LOGIN
if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("Login berjaya");
        window.location.href = "index.html"; // Redirect ke game
      })
      .catch((err) => {
        alert("Login gagal: " + err.message);
      });
  });
}

// REGISTER
if (registerBtn) {
  registerBtn.addEventListener("click", () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Akaun berjaya didaftarkan!");
      })
      .catch((err) => {
        alert("Daftar gagal: " + err.message);
      });
  });
}

// LOGOUT
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
      window.location.href = "login.html";
    });
  });
}

// PAPAR PANEL ikut login status
onAuthStateChanged(auth, (user) => {
  if (user) {
    if (loginPanel) loginPanel.style.display = "none";
    if (gamePanel) gamePanel.style.display = "block";
  } else {
    if (loginPanel) loginPanel.style.display = "block";
    if (gamePanel) gamePanel.style.display = "none";
  }
});

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}
