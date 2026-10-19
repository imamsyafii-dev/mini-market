"use client";

import { useDispatch } from "react-redux";

import { addItem } from "@/store/features/cart/cartSlice";

export default function AddToCartButton({ product }) {
  const dispatch = useDispatch();
  const isOutOfStock = product.stock <= 0;

  function handleAddToCart() {
    dispatch(addItem(product));
  }

  return (
    <button
      type="button"
      className="add-to-cart-button"
      onClick={handleAddToCart}
      disabled={isOutOfStock}
    >
      {isOutOfStock
        ? "Stok habis"
        : "Tambah ke keranjang"}
    </button>
  );
}