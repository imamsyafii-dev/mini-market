const STORAGE_KEY = "mini-market:last-order";

const PAYMENT_METHODS = new Set([
  "bank-transfer",
  "cod",
]);

export function saveLastOrder(order) {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    window.sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(order)
    );

    return true;
  } catch {
    return false;
  }
}

export function getLastOrderSnapshot() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return window.sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function parseLastOrder(serializedOrder) {
  if (!serializedOrder) {
    return null;
  }

  try {
    const order = JSON.parse(serializedOrder);

    if (
      typeof order?.orderNumber !== "string" ||
      order.orderNumber.trim() === "" ||
      typeof order.customerName !== "string" ||
      order.customerName.trim() === "" ||
      !Number.isInteger(order.totalQuantity) ||
      order.totalQuantity <= 0 ||
      !Number.isFinite(order.subtotal) ||
      order.subtotal < 0 ||
      !PAYMENT_METHODS.has(order.paymentMethod) ||
      typeof order.createdAt !== "string" ||
      Number.isNaN(Date.parse(order.createdAt))
    ) {
      return null;
    }

    return order;
  } catch {
    return null;
  }
}