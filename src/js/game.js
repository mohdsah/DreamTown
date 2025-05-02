// src/js/game.js
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";
import { addResource, upgradeBuilding } from "./farming.js";
// Ambil data pemain dari Firebase
export async function getPlayerData(uid) {
  const db = getDatabase();
  const snapshot = await get(ref(db, `players/${uid}`));
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    // Kalau tiada data, cipta data baru
    const defaultData = { xp: 0, money: 0 };
    await set(ref(db, `players/${uid}`), defaultData);
    return defaultData;
  }
}

// Kira tahap berdasarkan XP (boleh ubah formula ikut logik game anda)
export function calculateLevel(xp) {
  return Math.floor(xp / 100) + 1;
}

// Kemas kini XP dalam Firebase
export function updateXP(uid, xp) {
  const db = getDatabase();
  return set(ref(db, `players/${uid}/xp`), xp);
}

// Kemas kini Duit dalam Firebase
export function updateMoney(uid, money) {
  const db = getDatabase();
  return set(ref(db, `players/${uid}/money`), money);
}

import { showToast } from "./toast.js";

function addResource(type, amount) {
  if (playerData.inventory[type] !== undefined) {
    playerData.inventory[type] += amount;
    showToast(`${type} bertambah +${amount}`);
    saveToFirebase();
    updateUI();
  } else {
    showToast("Jenis item tidak sah!", "#f44336");
  }
}

import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

const db = getDatabase();

// Jual item
document.getElementById("sellBtn").addEventListener("click", () => {
  const item = document.getElementById("sellItem").value;
  const qty = parseInt(document.getElementById("sellQty").value);
  const price = parseInt(document.getElementById("sellPrice").value);

  if (qty > 0 && price > 0 && window.playerData.inventory[item] >= qty) {
    // Tolak stok dari inventory
    window.playerData.inventory[item] -= qty;

    // Simpan ke Firebase Marketplace
    const sellRef = ref(db, "marketplace");
    push(sellRef, {
      uid: window.currentUID,
      item,
      qty,
      price
    });

    savePlayerData({ inventory: window.playerData.inventory });
    loadMarket();
  } else {
    alert("Stok tidak cukup atau input tidak sah.");
  }
});

// Papar jualan
function loadMarket() {
  const marketRef = ref(db, "marketplace");
  onValue(marketRef, (snapshot) => {
    const list = document.getElementById("marketList");
    list.innerHTML = "";
    snapshot.forEach(child => {
      const data = child.val();
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${data.item}</td>
        <td>${data.qty}</td>
        <td>RM ${data.price}</td>
        <td><button onclick="buyItem('${child.key}', '${data.item}', ${data.qty}, ${data.price})">Beli</button></td>
      `;
      list.appendChild(row);
    });
  });
}

window.buyItem = function (id, item, qty, price) {
  if (window.playerData.money >= price) {
    window.playerData.money -= price;
    window.playerData.inventory[item] += qty;
    remove(ref(db, "marketplace/" + id));
    savePlayerData({
      money: window.playerData.money,
      inventory: window.playerData.inventory
    });
    alert("Pembelian berjaya!");
  } else {
    alert("Duit tidak cukup!");
  }
};

loadMarket();

import { savePlayerData, loadPlayerData } from "./firebase-game.js";

// Contoh bila tambah XP
gainXpBtn.addEventListener("click", () => {
  playerData.xp += 10;
  if (playerData.xp >= 100) {
    playerData.xp = 0;
    playerData.level += 1;
  }
  updateUI();
  savePlayerData();
});
