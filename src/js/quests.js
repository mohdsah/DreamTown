// src/js/quests.js

export const DailyQuest = { quests: [ { id: 1, title: "Tani Padi 5x", type: "Padi", target: 5 }, { id: 2, title: "Kumpul Kayu 5x", type: "Kayu", target: 5 }, { id: 3, title: "Cari Kristal 1x", type: "Kristal", target: 1 } ], progress: {},

async init(playerData, saveFunc) { if (!playerData.questProgress) { playerData.questProgress = {}; this.quests.forEach(q => { playerData.questProgress[q.id] = 0; }); await saveFunc({ questProgress: playerData.questProgress }); } this.progress = playerData.questProgress; this.render(playerData); },

render(playerData) { const list = document.getElementById("questList"); if (!list) return; list.innerHTML = "";

this.quests.forEach(q => {
  const current = playerData.questProgress[q.id] || 0;
  const done = current >= q.target;
  const item = document.createElement("li");
  item.textContent = `${q.title} - ${current}/${q.target}`;
  item.style.color = done ? "green" : "black";
  list.appendChild(item);
});

},

update(playerData, type, saveFunc) { const found = this.quests.find(q => q.type === type); if (found && playerData.questProgress[found.id] < found.target) { playerData.questProgress[found.id]++; saveFunc({ questProgress: playerData.questProgress }); } } };

export function renderQuests(playerData) { DailyQuest.render(playerData); }

