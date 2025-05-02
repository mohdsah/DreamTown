// src/js/farming.js

import { playerData, updateUI } from "./game-data.js"; import { savePlayerData } from "./firebase-game.js"; import { showToast } from "./toast.js";

export function addResource(type, amount) { if (playerData.inventory[type] !== undefined) { playerData.inventory[type] += amount; savePlayerData({ inventory: playerData.inventory }); updateUI(); showToast(+${amount} ${type}, "#2196f3"); } else { showToast("Jenis item tidak sah!", "#f44336"); } }

