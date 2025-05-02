// src/js/marketplace.js

import { getDatabase, ref, push, remove, onValue, update } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js"; import { updateInventoryUI } from "./inventory.js";

const db = getDatabase(); const marketRef = ref(db, "marketplace");

export function postItemForSale(uid, itemName, quantity, price, playerInventory, callback) { if (!playerInventory[itemName] || playerInventory[itemName] < quantity) { alert("Anda tidak mempunyai item mencukupi untuk dijual."); return; }

// Kurangkan dari inventori sendiri dahulu playerInventory[itemName] -= quantity; updateInventoryUI(playerInventory);

// Simpan ke marketplace push(marketRef, { seller: uid, item: itemName, quantity: quantity, price: price }).then(() => { callback && callback(); }); }

export function loadMarketplace(callback) { onValue(marketRef, (snapshot) => { const data = snapshot.val() || {}; callback(data); }); }

export function buyItem(itemKey, itemData, currentUID, playerData, callback) { const totalCost = itemData.price; if (playerData.money < totalCost) { alert("Tidak cukup duit untuk membeli item ini."); return; }

// Kurangkan duit dan tambah ke inventori playerData.money -= totalCost; if (!playerData.inventory[itemData.item]) playerData.inventory[itemData.item] = 0; playerData.inventory[itemData.item] += itemData.quantity; updateInventoryUI(playerData.inventory);

// Buang item dari marketplace remove(ref(db, marketplace/${itemKey})).then(() => { callback && callback(); }); }

