export function getDefaultInventory() {
  return {
    Padi: 0,
    Sayur: 0,
    Kayu: 0,
    Kristal: 0
  };
}

export function updateInventoryUI(inventory) {
  document.getElementById("invPadi").textContent = inventory.Padi;
  document.getElementById("invSayur").textContent = inventory.Sayur;
  document.getElementById("invKayu").textContent = inventory.Kayu;
  document.getElementById("invKristal").textContent = inventory.Kristal;
}
