import { getDatabase, ref, get } from "firebase/database";

function loadUsers() {
  const db = getDatabase();
  const usersRef = ref(db, 'users/');
  get(usersRef).then(snapshot => {
    const list = document.getElementById("userList");
    list.innerHTML = '';
    snapshot.forEach(child => {
      const li = document.createElement("li");
      li.innerText = `${child.key}: ${JSON.stringify(child.val())}`;
      list.appendChild(li);
    });
  });
}