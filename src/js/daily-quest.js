export const DailyQuest = {
  async init(playerData, saveFn) {
    this.quests = [
      { task: "Kumpul 20 Padi", key: "Padi", target: 20, done: false },
      { task: "Cari 5 Kristal", key: "Kristal", target: 5, done: false }
    ];
    this.save = saveFn;
    this.player = playerData;
    this.render(playerData, saveFn);
  },

  render(playerData, saveFn) {
    const list = document.getElementById("questList");
    list.innerHTML = "";
    this.quests.forEach((q, i) => {
      const done = playerData.inventory[q.key] >= q.target;
      const li = document.createElement("li");
      li.innerText = `${q.task} - ${done ? "SIAP" : "BELUM"}`;
      if (done && !q.done) {
        q.done = true;
        playerData.money += 100;
        saveFn({ money: playerData.money });
      }
      list.appendChild(li);
    });
  }
};
