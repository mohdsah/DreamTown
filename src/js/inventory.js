// src/js/inventory.js

export function getDefaultInventory() { return { Padi: 0, Sayur: 0, Kayu: 0, Kristal: 0 }; }

export function updateInventoryUI(inventory) { const invMap = { invPadi: inventory.Padi, invSayur: inventory.Sayur, invKayu: inventory.Kayu, invKristal: inventory.Kristal };

for (const id in invMap) { const el = document.getElementById(id); if (el) el.textContent = invMap[id]; } }

