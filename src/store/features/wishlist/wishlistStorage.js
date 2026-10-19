const STORAGE_KEY = "mini-market:wishlist";
const STORAGE_VERSION = 1;

function normalizeWishlistItem(item) {
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
    item.stock < 0
  ) {
    return null;
  }

  return {
    id: item.id,
    title: item.title,
    price: item.price,
    thumbnail: item.thumbnail,
    stock: item.stock,
  };
}

function normalizeWishlistItems(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  const normalizedItems = [];
  const productIds = new Set();

  for (const item of items) {
    const normalizedItem =
      normalizeWishlistItem(item);

    if (
      normalizedItem === null ||
      productIds.has(normalizedItem.id)
    ) {
      continue;
    }

    productIds.add(normalizedItem.id);
    normalizedItems.push(normalizedItem);
  }

  return normalizedItems;
}

export function loadWishlist() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const serializedWishlist =
      window.localStorage.getItem(STORAGE_KEY);

    if (!serializedWishlist) {
      return [];
    }

    const storedWishlist = JSON.parse(
      serializedWishlist
    );

    if (
      storedWishlist?.version !== STORAGE_VERSION ||
      !Array.isArray(storedWishlist.items)
    ) {
      window.localStorage.removeItem(STORAGE_KEY);
      return [];
    }

    return normalizeWishlistItems(
      storedWishlist.items
    );
  } catch {
    return [];
  }
}

export function saveWishlist(items) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        version: STORAGE_VERSION,
        items: normalizeWishlistItems(items),
      })
    );
  } catch {
    /*
     * localStorage bisa tidak tersedia atau penuh.
     * Redux wishlist tetap dapat bekerja di memory.
     */
  }
}