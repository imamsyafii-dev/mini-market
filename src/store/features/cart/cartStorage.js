const STORAGE_KEY = "mini-market:cart";
const STORAGE_VERSION = 1;

function normalizeCartItem(item) {
  if (
    !item ||
    !Number.isInteger(item.id) ||
    item.id <= 0 ||
    typeof item.title !== "string" ||
    item.title.trim() === "" ||
    !Number.isFinite(item.price) ||
    item.price < 0 ||
    typeof item.thumbnail !== "string" ||
    !Number.isInteger(item.stock) ||
    item.stock <= 0 ||
    !Number.isInteger(item.quantity) ||
    item.quantity <= 0
  ) {
    return null;
  }

  return {
    id: item.id,
    title: item.title,
    price: item.price,
    thumbnail: item.thumbnail,
    stock: item.stock,
    quantity: Math.min(
      item.quantity,
      item.stock
    ),
  };
}

function normalizeCartItems(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .map(normalizeCartItem)
    .filter((item) => item !== null);
}

export function loadCart() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const serializedCart =
      window.localStorage.getItem(STORAGE_KEY);

    if (!serializedCart) {
      return [];
    }

    const storedCart = JSON.parse(serializedCart);

    if (
      storedCart?.version !== STORAGE_VERSION ||
      !Array.isArray(storedCart.items)
    ) {
      window.localStorage.removeItem(STORAGE_KEY);
      return [];
    }

    return normalizeCartItems(storedCart.items);
  } catch {
    return [];
  }
}

export function saveCart(items) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        version: STORAGE_VERSION,
        items: normalizeCartItems(items),
      })
    );
  } catch {
    /*
     * localStorage bisa tidak tersedia atau penuh.
     * Redux cart tetap dapat bekerja di memory.
     */
  }
}