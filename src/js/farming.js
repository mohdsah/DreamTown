// src/js/farming.js

import { playerData, updateUI } from "./game-data.js"; import { savePlayerData } from "./firebase-game.js"; import { showToast } from "./toast.js";

const rareDropRate = 0.05; // 5% chance

export function addResource(type, amount) { if (playerData.inventory[type] !== undefined) { playerData.inventory[type] += amount; savePlayerData({ inventory: playerData.inventory }); updateUI(); showToast(+${amount} ${type}, "#2196f3"); checkRareDrop(type); } else { showToast("Jenis item tidak sah!", "#f44336"); } }

function checkRareDrop(resourceType) { const chance = Math.random(); if (chance < rareDropRate) { if (!playerData.rareItems) playerData.rareItems = {};

const rareItem = `${resourceType} Gem`;
if (!playerData.rareItems[rareItem]) {
  playerData.rareItems[rareItem] = 0;
}
playerData.rareItems[rareItem] += 1;
savePlayerData({ rareItems: playerData.rareItems });
showToast(`RARE DROP: ${rareItem} ditemui!`, "#9c27b0");

} }

