// src/js/upgrade.js

import { savePlayerData } from "./firebase-game.js"; import { showToast } from "./toast.js";

export async function upgradeBuilding(playerData, updateUI) { const cost = 500; if (playerData.money >= cost) { playerData.money -= cost; playerData.level += 1; await savePlayerData({ money: playerData.money, level: playerData.level }); showToast("Bangunan berjaya dinaik taraf!", "#4caf50"); updateUI(); } else { showToast("Tidak cukup duit untuk upgrade!", "#f44336"); } }

