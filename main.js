import { loadPlayerData, savePlayerData } from "./firebase-game.js";
import { DailyQuest } from "./daily-quest.js";

let playerData = {
  xp: 0,
  money: 0,
  level: 1,
  inventory: {
    Padi: 0,
    Sayur: 0,
    Kayu: 0,
    Kristal: 0
  }
};

window.playerData = playerData;
window.savePlayerData = savePlayerData;

function updateUI() {
  document.getElementById("xp").innerText = playerData.xp;
  document.getElementById("money").innerText = playerData.money;
  document.getElementById("level").innerText = playerData.level;

  document.getElementById("padi").innerText = playerData.inventory.Padi;
  document.getElementById("sayur").innerText = playerData.inventory.Sayur;
  document.getElementById("kayu").innerText = playerData.inventory.Kayu;
  document.getElementById("kristal").innerText = playerData.inventory.Kristal;
}

window.addXp = async function () {
  playerData.xp += 10;
  await savePlayerData({ xp: playerData.xp });
  updateUI();
};

window.addMoney = async function () {
  playerData.money += 100;
  await savePlayerData({ money: playerData.money });
  updateUI();
};

window.addResource = async function (type, amount) {
  if (playerData.inventory[type] !== undefined) {
    playerData.inventory[type] += amount;
    await savePlayerData({ inventory: playerData.inventory });
    updateUI();
    DailyQuest.render(playerData, savePlayerData);
  }
};

window.upgradeBuilding = async function () {
  const cost = 500;
  if (playerData.money >= cost) {
    playerData.money -= cost;
    playerData.level += 1;
    await savePlayerData({
      money: playerData.money,
      level: playerData.level
    });
    updateUI();
    alert("Bangunan dinaik taraf!");
  } else {
    alert("Tidak cukup duit.");
  }
};

window.addKristalTopup = async function () {
  playerData.inventory.Kristal += 10;
  await savePlayerData({ inventory: playerData.inventory });
  updateUI();
};

// Muat data semasa dan mula game
window.addEventListener("DOMContentLoaded", async () => {
  const data = await loadPlayerData();
  if (data) {
    playerData = { ...playerData, ...data };
    window.playerData = playerData;
  }
  updateUI();
  await DailyQuest.init(playerData, savePlayerData);
});
