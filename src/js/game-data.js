// src/js/game-data.js

import { getDefaultInventory, updateInventoryUI } from "./inventory.js";

export let playerData = { xp: 0, money: 0, level: 1, inventory: getDefaultInventory() };

export function updateUI() { document.getElementById("xp").textContent = playerData.xp; document.getElementById("money").textContent = playerData.money; document.getElementById("level").textContent = playerData.level; updateInventoryUI(playerData.inventory); }

