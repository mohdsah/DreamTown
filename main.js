import app from "./src/js/firebase-config.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const db = getDatabase(app);
const auth = getAuth();

let currentUID = null;

// UI element
const xpEl = document.getElementById("xp");
const moneyEl = document.getElementById("money");
const levelEl = document.getElementById("level");
const xpBtn = document.getElementById("gainXpBtn");
const moneyBtn = document.getElementById("earnMoneyBtn");

// Default data
let userData = {
  xp: 0,
  money: 0,
  level: 1,
};

function updateUI(data) {
  xpEl.textContent = data.xp;
  moneyEl.textContent = data.money;
  levelEl.textContent = data.level;
}

function saveToFirebase() {
  if (currentUID) {
    const userRef = ref(db, "players/" + currentUID);
    set(userRef, userData);
  }
}

function setupGameListeners() {
  xpBtn.addEventListener("click", () => {
    userData.xp += 10;
    if (userData.xp >= 100) {
      userData.xp = 0;
      userData.level += 1;
    }
    updateUI(userData);
    saveToFirebase();
  });

  moneyBtn.addEventListener("click", () => {
    userData.money += 50;
    updateUI(userData);
    saveToFirebase();
  });
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUID = user.uid;
    const userRef = ref(db, "players/" + currentUID);

    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        userData = data;
        updateUI(userData);
      } else {
        set(userRef, userData); // first time
      }
    });

    setupGameListeners();
  } else {
    alert("Sila log masuk dahulu.");
    // Anda boleh redirect ke login.html
  }
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  signOut(auth).then(() => {
    // Sembunyikan panel game, tunjuk login semula
    document.getElementById("gamePanel").style.display = "none";
    document.getElementById("loginPanel").style.display = "block";
    alert("Berjaya log keluar.");
  }).catch((error) => {
    alert("Ralat semasa log keluar: " + error.message);
  });
});
