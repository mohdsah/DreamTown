// src/js/admin/admin-panel.js

import app from "../firebase-config.js"; import { getDatabase, ref, get, update, set, push } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js"; import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const db = getDatabase(app); const auth = getAuth(); let isSuperAdmin = false; let currentUser = null;

function showToast(msg) { const el = document.getElementById("toast"); if (el) { el.textContent = msg; el.classList.add("show"); setTimeout(() => el.classList.remove("show"), 3000); } }

function toggleSpinner(show) { const el = document.getElementById("spinner"); if (el) el.style.display = show ? "block" : "none"; }

function logActivity(action) { if (!currentUser) return; const logRef = ref(db, "logs"); const logEntry = { email: currentUser.email, action, timestamp: new Date().toISOString() }; push(logRef, logEntry); }

onAuthStateChanged(auth, (user) => { if (!user || (user.email !== "admin@email.com" && user.email !== "super@dreamtown.com")) { alert("Akses ini khas untuk admin sahaja."); window.location.href = "login.html"; } else { console.log("Admin masuk: " + user.email); currentUser = user; isSuperAdmin = user.email === "super@dreamtown.com"; if (isSuperAdmin) { const container = document.querySelector(".panel-box");

const resetBtn = document.createElement("button");
  resetBtn.textContent = "Reset Semua Pemain";
  resetBtn.className = "admin-btn";
  resetBtn.onclick = resetSemuaData;
  container.appendChild(resetBtn);

  const rareBtn = document.createElement("button");
  rareBtn.textContent = "Beri Item Rare kepada Semua";
  rareBtn.className = "admin-btn";
  rareBtn.onclick = beriItemRare;
  container.appendChild(rareBtn);
}

loadActivityLogs();

} });

window.tambahDuitSemua = async function () { toggleSpinner(true); const snapshot = await get(ref(db, "players")); if (snapshot.exists()) { const players = snapshot.val(); for (const uid in players) { const current = players[uid]; const newMoney = (current.money || 0) + 100; await update(ref(db, players/${uid}), { money: newMoney }); } toggleSpinner(false); showToast("Semua pemain telah menerima 100 duit."); logActivity("Tambah 100 duit kepada semua pemain"); } };

window.naikkanLevelSemua = async function () { toggleSpinner(true); const snapshot = await get(ref(db, "players")); if (snapshot.exists()) { const players = snapshot.val(); for (const uid in players) { const current = players[uid]; if ((current.level || 1) < 5) { await update(ref(db, players/${uid}), { level: 5 }); } } toggleSpinner(false); showToast("Semua pemain telah dinaikkan ke level 5 (jika perlu)."); logActivity("Naikkan semua pemain ke Level 5"); } };

window.resetXpSemua = async function () { toggleSpinner(true); const snapshot = await get(ref(db, "players")); if (snapshot.exists()) { const players = snapshot.val(); for (const uid in players) { await update(ref(db, players/${uid}), { xp: 0 }); } toggleSpinner(false); showToast("XP semua pemain telah direset ke 0."); logActivity("Reset XP semua pemain ke 0"); } };

async function resetSemuaData() { toggleSpinner(true); const snapshot = await get(ref(db, "players")); if (snapshot.exists()) { const players = snapshot.val(); for (const uid in players) { await update(ref(db, players/${uid}), { xp: 0, money: 0, level: 1 }); } toggleSpinner(false); showToast("Semua data pemain telah direset."); logActivity("Reset semua data pemain"); } }

async function beriItemRare() { toggleSpinner(true); const snapshot = await get(ref(db, "players")); if (snapshot.exists()) { const players = snapshot.val(); for (const uid in players) { await set(ref(db, inventory/${uid}/rareItem), true); } toggleSpinner(false); showToast("Item rare telah diberikan kepada semua pemain."); logActivity("Beri item rare kepada semua pemain"); } }

async function loadActivityLogs() { const logList = document.getElementById("activityLog"); if (!logList) return; const snapshot = await get(ref(db, "logs")); if (snapshot.exists()) { const logs = snapshot.val(); const entries = Object.values(logs).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); logList.innerHTML = ""; for (const log of entries) { const li = document.createElement("li"); li.textContent = [${log.timestamp.slice(0, 19).replace("T", " ")}] ${log.email} - ${log.action}; logList.appendChild(li); } } }

window.hantarNotifikasi = async function () { const mesej = prompt("Masukkan mesej notifikasi untuk semua pemain:"); if (!mesej) return;

toggleSpinner(true); const snapshot = await get(ref(db, "players")); if (snapshot.exists()) { const players = snapshot.val(); const timestamp = new Date().toISOString(); for (const uid in players) { await push(ref(db, notifications/${uid}), { message: mesej, timestamp }); } toggleSpinner(false); showToast("Notifikasi dihantar kepada semua pemain."); logActivity(Hantar notifikasi kepada semua: ${mesej}); } }

