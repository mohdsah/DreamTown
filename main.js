// main.js
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { updateXP, updateMoney, calculateLevel, getPlayerData } from "./src/js/game.js";

// Pastikan user login dulu sebelum mula
onAuthStateChanged(getAuth(), async (user) => {
  if (user) {
    const uid = user.uid;

    // Dapatkan data pemain dari game.js atau Firebase
    const playerData = await getPlayerData(uid);

    let xp = playerData.xp || 0;
    let money = playerData.money || 0;
    let level = calculateLevel(xp);

    // Paparkan data pada UI
    document.getElementById("xp").innerText = xp;
    document.getElementById("money").innerText = money;
    document.getElementById("level").innerText = level;

    // Event: Tambah XP
    document.getElementById("gainXpBtn").addEventListener("click", () => {
      xp += 10;
      level = calculateLevel(xp);
      updateXP(uid, xp); // Simpan ke Firebase
      document.getElementById("xp").innerText = xp;
      document.getElementById("level").innerText = level;
    });

    // Event: Tambah Duit
    document.getElementById("earnMoneyBtn").addEventListener("click", () => {
      money += 50;
      updateMoney(uid, money); // Simpan ke Firebase
      document.getElementById("money").innerText = money;
    });

  } else {
    // Kalau belum login, redirect ke login.html
    window.location.href = "login.html";
  }
});
