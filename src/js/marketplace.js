// src/js/marketplace.js

import { getDatabase, ref, push, remove, onValue } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js"; import { updateInventoryUI } from "./inventory.js"; import { playerData, updateUI } from "./game-data.js";

const db = getDatabase(); const marketRef = ref(db, "marketplace");

export function postItemForSale(uid, itemName, quantity, price, callback) { if (!playerData.inventory[itemName] || playerData.inventory[itemName] < quantity) { alert("Anda tidak mempunyai item mencukupi untuk dijual."); return; }

playerData.inventory[itemName] -= quantity; updateInventoryUI(playerData.inventory);

push(marketRef, { seller: uid, item: itemName, quantity: quantity, price: price }).then(() => { callback && callback(); }); }

export function loadMarketplace(callback) { onValue(marketRef, (snapshot) => { const data = snapshot.val() || {}; callback(data); }); }

export function buyItem(itemKey, itemData, currentUID, callback) { const totalCost = itemData.price; if (playerData.money < totalCost) { alert("Tidak cukup duit untuk membeli item ini."); return; }

playerData.money -= totalCost; if (!playerData.inventory[itemData.item]) playerData.inventory[itemData.item] = 0; playerData.inventory[itemData.item] += itemData.quantity; updateInventoryUI(playerData.inventory);

remove(ref(db, marketplace/${itemKey})).then(() => { callback && callback(); }); }

