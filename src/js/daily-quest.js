// src/js/daily-quest.js

export const DailyQuest = { quests: [ { task: "Kumpul 10 Padi", key: "Padi", target: 10, done: false }, { task: "Kumpul 5 Kayu", key: "Kayu", target: 5, done: false }, { task: "Cari 2 Kristal", key: "Kristal", target: 2, done: false } ],

async init(playerData, saveFn) { this.player = playerData; this.save = saveFn; this.render(playerData, saveFn); },

render(playerData, saveFn) { const list = document.getElementById("questList"); if (!list) return; list.innerHTML = ""; this.quests.forEach((q) => { const completed = playerData.inventory[q.key] >= q.target; const li = document.createElement("li"); li.innerText = ${q.task} - ${completed ? "SIAP" : "BELUM"}; list.appendChild(li);

if (completed && !q.done) {
    q.done = true;
    playerData.money += 100;
    saveFn({ money: playerData.money });
  }
});

} };

