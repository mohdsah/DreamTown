// src/js/farming.js

import { savePlayerData } from "./firebase-game.js"; import { renderQuests } from "./quests.js";

export function addResource(playerData, type, amount) { if (playerData.inventory[type] !== undefined) { playerData.inventory[type] += amount; savePlayerData({ inventory: playerData.inventory }); renderQuests(playerData); return true; } return false; }

export function upgradeBuilding(playerData) { const upgradeCost = 500; if (playerData.money >= upgradeCost) { playerData.money -= upgradeCost; playerData.level += 1; savePlayerData({ money: playerData.money, level: playerData.level }); return "Berjaya"; } else { return "Tidak cukup duit"; } }

import { showToast } from "./toast.js";

export function addResource(type, amount) {
  if (playerData.inventory[type] !== undefined) {
    playerData.inventory[type] += amount;
    showToast(`+${amount} ${type}`, "#2196f3");
    savePlayerData({ inventory: playerData.inventory });
    updateUI();
  }
}

