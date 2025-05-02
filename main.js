// main.js

import app from "./src/js/firebase-config.js"; import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js"; import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js"; import { getDefaultInventory, updateInventoryUI } from "./src/js/inventory.js"; import { postItemForSale, loadMarketplace, buyItem } from "./src/js/marketplace.js";

const db = getDatabase(app); const auth = getAuth();

let currentUID = null; let playerData = { xp: 0, money: 0, level: 1, inventory: getDefaultInventory() };

function updateUI(data) { document.getElementById("xp").textContent = data.xp; document.getElementById("money").textContent = data.money; document.getElementById("level").textContent = data.level; updateInventoryUI(data.inventory); }

function savePlayerData() { if (!currentUID) return; const userRef = ref(db, "players/" + currentUID); set(userRef, playerData); }

onAuthStateChanged(auth, (user) => { if (user) { currentUID = user.uid; const userRef = ref(db, "players/" + currentUID);

onValue(userRef, (snapshot) => {
  const data = snapshot.val();
  if (data) {
    playerData = data;
    updateUI(playerData);
    loadMarketplace(displayMarketplace);
  } else {
    set(userRef, playerData);
  }
});

setupButtons();

} else { window.location.href = "login.html"; } });

function setupButtons() { document.getElementById("gainXpBtn").addEventListener("click", () => { playerData.xp += 10; if (playerData.xp >= 100) { playerData.xp = 0; playerData.level += 1; } updateUI(playerData); savePlayerData(); });

document.getElementById("earnMoneyBtn").addEventListener("click", () => { playerData.money += 50; updateUI(playerData); savePlayerData(); });

document.getElementById("marketSellBtn").addEventListener("click", () => { const item = document.getElementById("marketItem").value; const qty = parseInt(document.getElementById("marketQty").value); const price = parseInt(document.getElementById("marketPrice").value);

postItemForSale(currentUID, item, qty, price, playerData.inventory, () => {
  updateUI(playerData);
  savePlayerData();
});

                                                                          export function showToast(message, color = "#4caf50") {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.style.background = color;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
                                                                          }
                                                                          
}); }

function displayMarketplace(data) { const list = document.getElementById("marketList"); list.innerHTML = ""; for (const key in data) { const item = data[key]; const row = document.createElement("tr"); row.innerHTML = <td>${item.item}</td> <td>${item.quantity}</td> <td>${item.price}</td> <td><button onclick="buyItemHandler('${key}')">Beli</button></td>; list.appendChild(row); } }

window.buyItemHandler = function (key) { onValue(ref(db, "marketplace/" + key), (snapshot) => { const itemData = snapshot.val(); if (itemData) { buyItem(key, itemData, currentUID, playerData, () => { updateUI(playerData); savePlayerData(); }); } }, { onlyOnce: true }); };

window.addResource = async function(type, amount) { if (playerData.inventory[type] !== undefined) { playerData.inventory[type] += amount; updateUI(playerData); savePlayerData(); } };

window.upgradeBuilding = async function() { const cost = 500; if (playerData.money >= cost) { playerData.money -= cost; playerData.level += 1; updateUI(playerData); savePlayerData(); alert("Bangunan berjaya dinaik taraf!"); } else { alert("Tidak cukup duit untuk upgrade."); } };

window.topupKristal = async function(amount) { playerData.inventory.Kristal += amount; updateUI(playerData); savePlayerData(); alert("Topup berjaya: +" + amount + " Kristal!"); };

