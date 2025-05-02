// src/js/admin/admin-login.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js"; import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const firebaseConfig = { apiKey: "AIzaSyABbbqTjJ0AQUlOVzv6SJtnjUCAWKjnQK8", authDomain: "dreamtowndemo.firebaseapp.com", databaseURL: "https://dreamtowndemo-default-rtdb.asia-southeast1.firebasedatabase.app", projectId: "dreamtowndemo", storageBucket: "dreamtowndemo.firebasestorage.app", messagingSenderId: "388188231244", appId: "1:388188231244:web:c76651908a0c14f0ee06e9", measurementId: "G-YY3JMP7L13" };

const app = initializeApp(firebaseConfig); const auth = getAuth(app);

const loginBtn = document.getElementById("adminLoginBtn"); const emailEl = document.getElementById("adminEmail"); const passEl = document.getElementById("adminPassword"); const statusEl = document.getElementById("loginStatus");

loginBtn.addEventListener("click", () => { const email = emailEl.value.trim(); const password = passEl.value;

if (email !== "mohdsah5@gmail.com") { statusEl.textContent = "Hanya akaun admin dibenarkan."; return; }

signInWithEmailAndPassword(auth, email, password) .then(() => { statusEl.style.color = "green"; statusEl.textContent = "Login berjaya. Redirect..."; setTimeout(() => { window.location.href = "adminTown.html"; }, 1000); }) .catch((error) => { statusEl.textContent = "Login gagal: " + error.message; }); });

