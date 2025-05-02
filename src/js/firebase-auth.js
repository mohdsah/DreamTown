import app from './firebase-config.js';
import { getDatabase, ref, get, set } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js';

const db = getDatabase(app);
const auth = getAuth();

export async function loadPlayerData() {
  const user = auth.currentUser;
  if (!user) return null;
  const snap = await get(ref(db, 'players/' + user.uid));
  return snap.exists() ? snap.val() : null;
}

export async function savePlayerData(data) {
  const user = auth.currentUser;
  if (!user) return;
  return set(ref(db, 'players/' + user.uid), {
    ...data,
    email: user.email
  });
}
