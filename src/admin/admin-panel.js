// src/js/admin/admin-panel.js

import app from "../firebase-config.js"; import { getDatabase, ref, get, update, set } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js"; import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const db = getDatabase(app); const auth = getAuth(); let isSuperAdmin = false;

function showToast(msg) { const el = document.getElementById("toast"); if (el) { el.textContent = msg; el.classList.add("show"); setTimeout(() => el.classList.remove("show"), 3000); } }

function toggleSpinner(show) { const el = document.getElementById("spinner"); if (el) el.style.display = show ? "block" : "none"; }

onAuthStateChanged(auth, (user) => { if (!user || (user.email !== "admin@email.com" && user.email !== "super@dreamtown.com")) { alert("Akses ini khas untuk admin sahaja."); window.location.href = "login.html"; } else { console.log("Admin masuk: " + user.email); isSuperAdmin = user.email === "super@dreamtown.com"; if (isSuperAdmin) { const container = document.querySelector(".panel-box");

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

} });

window.tambahDuitSemua = async function () { toggleSpinner(true); const snapshot = await get(ref(db, "players")); if (snapshot.exists()) { const players = snapshot.val(); for (const uid in players) { const current = players[uid]; const newMoney = (current.money || 0) + 100; await update(ref(db, players/${uid}), { money: newMoney }); } toggleSpinner(false); showToast("Semua pemain telah menerima 100 duit."); } };

window.naikkanLevelSemua = async function () { toggleSpinner(true); const snapshot = await get(ref(db, "players")); if (snapshot.exists()) { const players = snapshot.val(); for (const uid in players) { const current = players[uid]; if ((current.level || 1) < 5) { await update(ref(db, players/${uid}), { level: 5 }); } } toggleSpinner(false); showToast("Semua pemain telah dinaikkan ke level 5 (jika perlu)."); } };

window.resetXpSemua = async function () { toggleSpinner(true); const snapshot = await get(ref(db, "players")); if (snapshot.exists()) { const players = snapshot.val(); for (const uid in players) { await update(ref(db, players/${uid}), { xp: 0 }); } toggleSpinner(false); showToast("XP semua pemain telah direset ke 0."); } };

async function resetSemuaData() { toggleSpinner(true); const snapshot = await get(ref(db, "players")); if (snapshot.exists()) { const players = snapshot.val(); for (const uid in players) { await update(ref(db, players/${uid}), { xp: 0, money: 0, level: 1 }); } toggleSpinner(false); showToast("Semua data pemain telah direset."); } }

async function beriItemRare() { toggleSpinner(true); const snapshot = await get(ref(db, "players")); if (snapshot.exists()) { const players = snapshot.val(); for (const uid in players) { await set(ref(db, inventory/${uid}/rareItem), true); } toggleSpinner(false); showToast("Item rare telah diberikan kepada semua pemain."); } }

