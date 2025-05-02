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
    Kristal: 0
  }
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

function saveToFirebase() {
  if (currentUID) {
    const userRef = ref(db, "players/" + currentUID);
    set(userRef, playerData);
  }
}

function setupGameEvents() {
  document.getElementById("gainXpBtn").addEventListener("click", () => {
    playerData.xp += 10;
    if (playerData.xp >= 100) {
      playerData.xp = 0;
      playerData.level += 1;
    }
    updateUI();
    saveToFirebase();
  });

  document.getElementById("earnMoneyBtn").addEventListener("click", () => {
    playerData.money += 50;
    updateUI();
    saveToFirebase();
  });

  // Farming events
  document.getElementById("taniPadiBtn").addEventListener("click", () => addResource("Padi", 5));
  document.getElementById("taniSayurBtn").addEventListener("click", () => addResource("Sayur", 5));
  document.getElementById("kumpulKayuBtn").addEventListener("click", () => addResource("Kayu", 5));
  document.getElementById("cariKristalBtn").addEventListener("click", () => addResource("Kristal", 1));
}

function addResource(type, amount) {
  if (playerData.inventory[type] !== undefined) {
    playerData.inventory[type] += amount;
    updateUI();
    saveToFirebase();
  }
}

// Auth listener
onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUID = user.uid;
    const userRef = ref(db, "players/" + currentUID);

    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        playerData = data;
        if (!playerData.inventory) {
          playerData.inventory = { Padi: 0, Sayur: 0, Kayu: 0, Kristal: 0 };
        }
        updateUI();
      } else {
        set(userRef, playerData);
      }
    });

    setupGameEvents();
  } else {
    alert("Sila log masuk terlebih dahulu.");
    window.location.href = "login.html";
  }
});
