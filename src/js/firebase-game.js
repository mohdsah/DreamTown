// src/js/firebase-game.js
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const db = getDatabase();
const auth = getAuth();

// Simpan data pemain
export function savePlayerData(data = {}) {
  const uid = auth.currentUser?.uid;
  if (!uid) return;

  const playerRef = ref(db, "players/" + uid);
  set(playerRef, {
    ...window.playerData,
    ...data
  });
}

// Muat semula data pemain
export async function loadPlayerData() {
  const uid = auth.currentUser?.uid;
  if (!uid) return null;

  const snapshot = await get(ref(db, "players/" + uid));
  return snapshot.exists() ? snapshot.val() : null;
}
