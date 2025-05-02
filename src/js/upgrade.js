import { savePlayerData } from "./firebase-game.js";
import { showToast } from "./toast.js";

export async function upgradeBuilding(playerData, updateUI) {
  const cost = 500;
  if (playerData.money >= cost) {
    playerData.money -= cost;
    playerData.level += 1;
    await savePlayerData({
      money: playerData.money,
      level: playerData.level
    });
    showToast("Bangunan berjaya dinaik taraf!", "#4caf50");
    updateUI();
  } else {
    showToast("Tidak cukup duit untuk upgrade!", "#f44336");
  }
}

export function jualItem(type, qty, harga) {
  if (playerData.inventory[type] >= qty) {
    playerData.inventory[type] -= qty;
    // Simpan ke database marketplace...
    showToast(`Jualan ${type} (${qty}) dihantar ke pasaran.`);
    savePlayerData({ inventory: playerData.inventory });
    updateUI();
  } else {
    showToast("Item tidak mencukupi!", "#f44336");
  }
}
