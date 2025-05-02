// main.js
import { loadPlayerData, savePlayerData } from "./src/js/firebase-game.js";
import { DailyQuest } from "./src/js/daily-quest.js";

window.playerData = {
  xp: 0,
  money: 0,
  level: 1,
  inventory: {
    Padi: 0,
    Sayur: 0,
    Kayu: 0,
    Kristal: 0,
  },
};

function updateUI() {
  document.getElementById("xp").textContent = window.playerData.xp;
  document.getElementById("money").textContent = window.playerData.money;
  document.getElementById("level").textContent = window.playerData.level;

  if (document.getElementById("inventoryDisplay")) {
    const inv = window.playerData.inventory;
    document.getElementById("inventoryDisplay").innerHTML =
      `Padi: ${inv.Padi}<br>Sayur: ${inv.Sayur}<br>Kayu: ${inv.Kayu}<br>Kristal: ${inv.Kristal}`;
  }
}

async function initGame() {
  const data = await loadPlayerData();
  if (data) window.playerData = data;
  updateUI();
  DailyQuest.init(window.playerData, savePlayerData);
}

window.addEventListener("DOMContentLoaded", initGame);

window.addXp = async function () {
  window.playerData.xp += 10;
  if (window.playerData.xp >= 100) {
    window.playerData.xp = 0;
    window.playerData.level += 1;
  }
  await savePlayerData({
    xp: window.playerData.xp,
    level: window.playerData.level,
  });
  updateUI();
};

window.addMoney = async function () {
  window.playerData.money += 50;
  await savePlayerData({ money: window.playerData.money });
  updateUI();
};

window.addResource = async function (type, amount) {
  if (window.playerData.inventory[type] !== undefined) {
    window.playerData.inventory[type] += amount;
    await savePlayerData({ inventory: window.playerData.inventory });
    updateUI();
    DailyQuest.render(window.playerData, savePlayerData);
  }
};

window.upgradeBuilding = async function () {
  const cost = 500;
  if (window.playerData.money >= cost) {
    window.playerData.money -= cost;
    window.playerData.level += 1;
    await savePlayerData({
      money: window.playerData.money,
      level: window.playerData.level,
    });
    alert("Bangunan telah dinaik taraf!");
    updateUI();
  } else {
    alert("Tidak cukup duit untuk upgrade.");
  }
};
