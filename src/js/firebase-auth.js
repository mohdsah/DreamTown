import { getAuth, signInAnonymously } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js';

export async function signInUser() {
  const auth = getAuth();
  const result = await signInAnonymously(auth);
  return result.user;
}
