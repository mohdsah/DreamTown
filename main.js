// main.js

import app from "./src/js/firebase-config.js"; import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js"; import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js"; import { addResource, upgradeBuilding } from "./src/js/farming.js"; import { DailyQuest } from "./src/js/quests.js";

const db = getDatabase(app); const auth = getAuth();

let currentUID = null; let playerData = { money: 0, level: 1, inventory: { Padi: 0, Sayur: 0, Kayu: 0, Kristal: 0 }, questProgress: {} };

const xpEl = document.getElementById("xp"); const moneyEl = document.getElementById("money"); const levelEl = document.getElementById("level");

const xpBtn = document.getElementById("gainXpBtn"); const moneyBtn = document.getElementById("earnMoneyBtn");

function updateUI() { if (moneyEl) moneyEl.textContent = playerData.money; if (levelEl) levelEl.textContent = playerData.level; if (xpEl) xpEl.textContent = playerData.xp || 0; }

function savePlayerData(data) { if (!currentUID) return; const userRef = ref(db, players/${currentUID}); Object.assign(playerData, data); set(userRef, playerData); }

onAuthStateChanged(auth, async (user) => { if (user) { currentUID = user.uid; const userRef = ref(db, players/${currentUID}); onValue(userRef, async (snapshot) => { const data = snapshot.val(); if (data) playerData = data; updateUI(); await DailyQuest.init(playerData, savePlayerData); }); setupButtons(); } else { alert("Sila log masuk dahulu."); window.location.href = "login.html"; } });

function setupButtons() { const farmingButtons = { Padi: document.getElementById("farmPadiBtn"), Sayur: document.getElementById("farmSayurBtn"), Kayu: document.getElementById("collectKayuBtn"), Kristal: document.getElementById("findKristalBtn") };

for (const type in farmingButtons) { if (farmingButtons[type]) { farmingButtons[type].addEventListener("click", () => { if (addResource(playerData, type, 5)) { DailyQuest.update(playerData, type, savePlayerData); updateUI(); } }); } }

const upgradeBtn = document.getElementById("upgradeBtn"); if (upgradeBtn) { upgradeBtn.addEventListener("click", () => { const result = upgradeBuilding(playerData); if (result === "Berjaya") alert("Bangunan dinaik taraf!"); else alert("Tidak cukup duit untuk upgrade!"); updateUI(); }); }

if (xpBtn) { xpBtn.addEventListener("click", () => { playerData.xp = (playerData.xp || 0) + 10; if (playerData.xp >= 100) { playerData.xp = 0; playerData.level++; } savePlayerData({ xp: playerData.xp, level: playerData.level }); updateUI(); }); }

if (moneyBtn) { moneyBtn.addEventListener("click", () => { playerData.money += 50; savePlayerData({ money: playerData.money }); updateUI(); }); } }

