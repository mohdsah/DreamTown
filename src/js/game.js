
import { database } from "../../firebase/firebase-config.js";
import { ref, set, get } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const xpEl = document.getElementById("xp");
const moneyEl = document.getElementById("money");
const levelEl = document.getElementById("level");
const gainXpBtn = document.getElementById("gainXpBtn");
const earnMoneyBtn = document.getElementById("earnMoneyBtn");

let player = {
  xp: 0,
  money: 0,
  level: 1,
  uid: "demo_user"
};

function updateUI() {
  xpEl.textContent = player.xp;
  moneyEl.textContent = player.money;
  levelEl.textContent = player.level;
}

function saveToFirebase() {
  set(ref(database, 'players/' + player.uid), player);
}

function gainXP(amount) {
  player.xp += amount;
  if (player.xp >= player.level * 100) {
    player.xp = 0;
    player.level += 1;
  }
  updateUI();
  saveToFirebase();
}

function earnMoney(amount) {
  player.money += amount;
  updateUI();
  saveToFirebase();
}

gainXpBtn.addEventListener("click", () => gainXP(10));
earnMoneyBtn.addEventListener("click", () => earnMoney(50));

function loadPlayerData() {
  const playerRef = ref(database, 'players/' + player.uid);
  get(playerRef).then((snapshot) => {
    if (snapshot.exists()) {
      player = { ...player, ...snapshot.val() };
      updateUI();
    } else {
      saveToFirebase();
    }
  });
}

loadPlayerData();
