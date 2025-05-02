import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, set, get, onValue } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyABbbqTjJ0AQUlOVzv6SJtnjUCAWKjnQK8",
  authDomain: "dreamtowndemo.firebaseapp.com",
  databaseURL: "https://dreamtowndemo-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dreamtowndemo",
  storageBucket: "dreamtowndemo.appspot.com",
  messagingSenderId: "388188231244",
  appId: "1:388188231244:web:c76651908a0c14f0ee06e9"
};

// Init
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();

let currentUID = null;
let playerData = {
  xp: 0,
  money: 0,
  level: 1,
  inventory: { Padi: 0, Sayur: 0, Kayu: 0, Kristal: 0 }
};

function updateUI() {
  document.getElementById("xp").innerText = playerData.xp;
  document.getElementById("money").innerText = playerData.money;
  document.getElementById("level").innerText = playerData.level;
  document.getElementById("padiCount").innerText = playerData.inventory.Padi;
  document.getElementById("sayurCount").innerText = playerData.inventory.Sayur;
  document.getElementById("kayuCount").innerText = playerData.inventory.Kayu;
  document.getElementById("kristalCount").innerText = playerData.inventory.Kristal;
}

function savePlayerData() {
  if (currentUID) {
    set(ref(db, "players/" + currentUID), playerData);
  }
}

function setupEvents() {
  document.getElementById("gainXpBtn").onclick = () => {
    playerData.xp += 10;
    if (playerData.xp >= 100) {
      playerData.xp = 0;
      playerData.level += 1;
    }
    updateUI();
    savePlayerData();
  };

  document.getElementById("earnMoneyBtn").onclick = () => {
    playerData.money += 50;
    updateUI();
    savePlayerData();
  };
}

window.addResource = function(item, amount) {
  if (playerData.inventory[item] !== undefined) {
    playerData.inventory[item] += amount;
    updateUI();
    savePlayerData();
  }
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUID = user.uid;
    const userRef = ref(db, "players/" + currentUID);
    onValue(userRef, (snapshot) => {
      if (snapshot.exists()) {
        playerData = snapshot.val();
        updateUI();
      } else {
        savePlayerData(); // First time user
      }
    });
    setupEvents();
  } else {
    alert("Sila log masuk dahulu.");
    window.location.href = "login.html";
  }
});
