export const DailyQuest = {
  quests: [
    { text: "Kumpul 10 Kayu", key: "Kayu", goal: 10, reward: 100 },
    { text: "Tani 20 Padi", key: "Padi", goal: 20, reward: 200 },
    { text: "Tani 20 Sayur", key: "Sayur", goal: 20, reward: 200 },
    { text: "Cari 3 Kristal", key: "Kristal", goal: 3, reward: 300 }
  ],

  async init(player, saveFunc) {
    this.render(player, saveFunc);
  },

  async render(player, saveFunc) {
    const list = document.getElementById("questList");
    if (!list) return;
    list.innerHTML = "";

    this.quests.forEach((quest) => {
      const done = player.inventory[quest.key] >= quest.goal;
      const li = document.createElement("li");
      li.textContent = quest.text + (done ? " (Selesai!)" : "");
      if (done) {
        li.style.color = "green";
        player.money += quest.reward;
        player.inventory[quest.key] = 0;
        saveFunc(player);
      }
      list.appendChild(li);
    });
  }
};
