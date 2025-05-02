// src/js/admin/admin-panel.js

import app from "../firebase-config.js"; import { getDatabase, ref, get, update } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js"; import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const db = getDatabase(app); const auth = getAuth();

// Utiliti toast & spinner (jika wujud dalam halaman) function showToast(msg) { const el = document.getElementById("toast"); if (el) { el.textContent = msg; el.classList.add("show"); setTimeout(() => el.classList.remove("show"), 3000); } }

function toggleSpinner(show) { const el = document.getElementById("spinner"); if (el) el.style.display = show ? "block" : "none"; }

// Sekat akses jika bukan admin onAuthStateChanged(auth, (user) => { if (!user || user.email !== "admin@email.com") { alert("Akses ini khas untuk admin sahaja."); window.location.href = "login.html"; } else { console.log("Admin masuk: " + user.email); } });

// Fungsi: tambah duit kepada semua pemain window.tambahDuitSemua = async function () { toggleSpinner(true); const snapshot = await get(ref(db, "players")); if (snapshot.exists()) { const players = snapshot.val(); for (const uid in players) { const current = players[uid]; const newMoney = (current.money || 0) + 100; await update(ref(db, players/${uid}), { money: newMoney }); } toggleSpinner(false); showToast("Semua pemain telah menerima 100 duit."); } };

// Fungsi: naikkan level semua pemain ke 5 jika kurang dari 5 window.naikkanLevelSemua = async function () { toggleSpinner(true); const snapshot = await get(ref(db, "players")); if (snapshot.exists()) { const players = snapshot.val(); for (const uid in players) { const current = players[uid]; if ((current.level || 1) < 5) { await update(ref(db, players/${uid}), { level: 5 }); } } toggleSpinner(false); showToast("Semua pemain telah dinaikkan ke level 5 (jika perlu)."); } };

// Fungsi: reset semua XP ke 0 window.resetXpSemua = async function () { toggleSpinner(true); const snapshot = await get(ref(db, "players")); if (snapshot.exists()) { const players = snapshot.val(); for (const uid in players) { await update(ref(db, players/${uid}), { xp: 0 }); } toggleSpinner(false); showToast("XP semua pemain telah direset ke 0."); } };

