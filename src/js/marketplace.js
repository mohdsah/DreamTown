// src/js/marketplace.js

import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

const db = getDatabase();

window.sellItem = async function () { const item = document.getElementById("sellItem").value; const qty = parseInt(document.getElementById("sellQty").value); const price = parseInt(document.getElementById("sellPrice").value);

if (qty > 0 && price > 0 && window.playerData.inventory[item] >= qty) { window.playerData.inventory[item] -= qty; await window.savePlayerData({ inventory: window.playerData.inventory });

const marketRef = ref(db, "marketplace");
push(marketRef, {
  uid: window.auth?.currentUser?.uid || "anon",
  item,
  qty,
  price
});

alert("Item berjaya dijual!");
loadMarketplace();

} else { alert("Input tidak sah atau stok tidak cukup."); } };

window.loadMarketplace = function () { const marketRef = ref(db, "marketplace"); onValue(marketRef, (snapshot) => { const list = document.getElementById("marketList"); if (!list) return; list.innerHTML = ""; snapshot.forEach((child) => { const data = child.val(); const row = document.createElement("tr"); row.innerHTML = <td>${data.item}</td> <td>${data.qty}</td> <td>RM ${data.price}</td> <td><button onclick="buyItem('${child.key}', '${data.item}', ${data.qty}, ${data.price})">Beli</button></td>; list.appendChild(row); }); }); };

window.buyItem = async function (id, item, qty, price) { if (window.playerData.money >= price) { window.playerData.money -= price; window.playerData.inventory[item] += qty; await window.savePlayerData({ money: window.playerData.money, inventory: window.playerData.inventory }); remove(ref(db, "marketplace/" + id)); alert("Pembelian berjaya!"); loadMarketplace(); } else { alert("Duit tidak mencukupi."); } };

// Auto load senarai marketplace selepas DOM window.addEventListener("DOMContentLoaded", () => { loadMarketplace(); });

