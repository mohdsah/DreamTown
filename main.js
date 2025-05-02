import app from "./src/js/firebase-config.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const db = getDatabase(app);
const auth = getAuth();

let currentUID = null;
let playerData = {
  xp: 0,
  money: 0,
  level: 1,
  inventory: {
    Padi: 0,
    Sayur: 0,
    Kayu: 0,
    Kristal: 0,
  }
};

const xpEl = document.getElementById("xp");
const moneyEl = document.getElementById("money");
const levelEl = document.getElementById("level");

// Inventory Elements
const invPadi = document.getElementById("invPadi");
const invSayur = document.getElementById("invSayur");
const invKayu = document.getElementById("invKayu");
const invKristal = document.getElementById("invKristal");

function updateUI(data) {
  xpEl.textContent = data.xp;
  moneyEl.textContent = data.money;
  levelEl.textContent = data.level;
  updateInventoryUI(data.inventory);
}

function updateInventoryUI(inv) {
  invPadi.textContent = inv.Padi;
  invSayur.textContent = inv.Sayur;
  invKayu.textContent = inv.Kayu;
  invKristal.textContent = inv.Kristal;
}

function savePlayerData() {
  if (!currentUID) return;
  const userRef = ref(db, "players/" + currentUID);
  set(userRef, playerData);
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUID = user.uid;
    const userRef = ref(db, "players/" + currentUID);

    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        playerData = data;
        updateUI(playerData);
      } else {
        set(userRef, playerData);
      }
    });

    setupButtons();
  } else {
    window.location.href = "login.html";
  }
});

function setupButtons() {
  document.getElementById("gainXpBtn").addEventListener("click", () => {
    playerData.xp += 10;
    if (playerData.xp >= 100) {
      playerData.xp = 0;
      playerData.level += 1;
    }
    updateUI(playerData);
    savePlayerData();
  });

  document.getElementById("earnMoneyBtn").addEventListener("click", () => {
    playerData.money += 50;
    updateUI(playerData);
    savePlayerData();
  });
}

window.addResource = async function(type, amount) {
  if (playerData.inventory[type] !== undefined) {
    playerData.inventory[type] += amount;
    updateInventoryUI(playerData.inventory);
    savePlayerData();
  }
};

window.upgradeBuilding = async function() {
  const cost = 500;
  if (playerData.money >= cost) {
    playerData.money -= cost;
    playerData.level += 1;
    updateUI(playerData);
    savePlayerData();
    alert("Bangunan berjaya dinaik taraf!");
  } else {
    alert("Tidak cukup duit untuk upgrade.");
  }
};

window.topupKristal = async function(amount) {
  playerData.inventory.Kristal += amount;
  updateInventoryUI(playerData.inventory);
  savePlayerData();
  alert("Topup berjaya: +" + amount + " Kristal!");
};

import { getDefaultInventory, updateInventoryUI } from "./src/js/inventory.js";

// playerData default
let playerData = {
  xp: 0,
  money: 0,
  level: 1,
  inventory: getDefaultInventory()
};
