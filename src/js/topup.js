// src/js/topup.js

window.addKristalTopup = async function() { if (window.playerData) { window.playerData.inventory.Kristal += 10; await window.savePlayerData({ inventory: window.playerData.inventory }); document.getElementById("kristal").innerText = window.playerData.inventory.Kristal; alert("Topup Kristal +10 berjaya!"); } };

