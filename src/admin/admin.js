// src/js/admin.js import app from "../firebase-config.js"; import { getDatabase, ref, get, remove, update } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

const db = getDatabase(app); const tableBody = document.getElementById("playerTable");

async function fetchPlayers() { const snapshot = await get(ref(db, "players")); if (snapshot.exists()) { const data = snapshot.val(); tableBody.innerHTML = ""; Object.entries(data).forEach(([uid, player]) => { const row = document.createElement("tr"); row.innerHTML = <td>${player.email || "(tanpa emel)"}</td> <td>${player.xp || 0}</td> <td>${player.money || 0}</td> <td>${player.level || 1}</td> <td class="actions"> <button class="edit-btn" onclick="editPlayer('${uid}', ${player.xp || 0}, ${player.money || 0}, ${player.level || 1})">Edit</button> <button class="delete-btn" onclick="deletePlayer('${uid}')">Padam</button> </td>; tableBody.appendChild(row); }); } }

window.editPlayer = function(uid, xp, money, level) { const newXP = prompt("Masukkan XP baru:", xp); const newMoney = prompt("Masukkan Duit baru:", money); const newLevel = prompt("Masukkan Level baru:", level);

if (newXP !== null && newMoney !== null && newLevel !== null) { update(ref(db, "players/" + uid), { xp: parseInt(newXP), money: parseInt(newMoney), level: parseInt(newLevel) }).then(fetchPlayers); } };

window.deletePlayer = function(uid) { if (confirm("Padam pemain ini?")) { remove(ref(db, "players/" + uid)).then(fetchPlayers); } };

fetchPlayers();

