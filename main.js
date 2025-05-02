import { loadPlayerData, savePlayerData } from './src/js/firebase-game.js';
import { DailyQuest } from './src/js/daily-quest.js';

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

window.addEventListener("DOMContentLoaded", async () => {
  const saved = await loadPlayerData();
  if (saved) playerData = saved;

  updateUI();
  await DailyQuest.init(playerData, savePlayerData);
});

function updateUI() {
  document.getElementById("xp").innerText = playerData.xp;
  document.getElementById("money").innerText = playerData.money;
  document.getElementById("level").innerText = playerData.level;
  document.getElementById("padi").innerText = playerData.inventory.Padi;
  document.getElementById("sayur").innerText = playerData.inventory.Sayur;
  document.getElementById("kayu").innerText = playerData.inventory.Kayu;
  document.getElementById("kristal").innerText = playerData.inventory.Kristal;
}

document.getElementById("gainXpBtn").addEventListener("click", async () => {
  playerData.xp += 10;
  await savePlayerData({ xp: playerData.xp });
  updateUI();
});

document.getElementById("earnMoneyBtn").addEventListener("click", async () => {
  playerData.money += 50;
  await savePlayerData({ money: playerData.money });
  updateUI();
});

window.addResource = async function(type, amount) {
  if (playerData.inventory[type] !== undefined) {
    playerData.inventory[type] += amount;
    await savePlayerData({ inventory: playerData.inventory });
    updateUI();
    DailyQuest.render(playerData, savePlayerData);
  }
};

window.upgradeBuilding = async function() {
  const cost = 500;
  if (playerData.money >= cost) {
    playerData.money -= cost;
    playerData.level += 1;
    await savePlayerData({ money: playerData.money, level: playerData.level });
    alert("Bangunan telah dinaik taraf!");
    updateUI();
  } else {
