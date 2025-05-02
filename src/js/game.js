// src/js/game.js
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

// Ambil data pemain dari Firebase
export async function getPlayerData(uid) {
  const db = getDatabase();
  const snapshot = await get(ref(db, `players/${uid}`));
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    // Kalau tiada data, cipta data baru
    const defaultData = { xp: 0, money: 0 };
    await set(ref(db, `players/${uid}`), defaultData);
    return defaultData;
  }
}

// Kira tahap berdasarkan XP (boleh ubah formula ikut logik game anda)
export function calculateLevel(xp) {
  return Math.floor(xp / 100) + 1;
}

// Kemas kini XP dalam Firebase
export function updateXP(uid, xp) {
  const db = getDatabase();
  return set(ref(db, `players/${uid}/xp`), xp);
}

// Kemas kini Duit dalam Firebase
export function updateMoney(uid, money) {
  const db = getDatabase();
  return set(ref(db, `players/${uid}/money`), money);
}
