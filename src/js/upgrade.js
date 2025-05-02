// src/js/upgrade.js

window.upgradeBuilding = async function () { const upgradeCost = 500;

if (window.playerData.money >= upgradeCost) { window.playerData.money -= upgradeCost; window.playerData.level += 1;

await window.savePlayerData({
  money: window.playerData.money,
  level: window.playerData.level
});

document.getElementById("money").innerText = window.playerData.money;
document.getElementById("level").innerText = window.playerData.level;

alert("Bangunan telah dinaik taraf!");

} else { alert("Duit tidak mencukupi untuk upgrade."); } };

