"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeItem,
  selectCartHydrated,
  selectCartItems,
  selectCartSubtotal,
  selectCartTotalQuantity,
} from "@/store/features/cart/cartSlice";

const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function CartPage() {
  const dispatch = useDispatch();
  const isHydrated = useSelector(selectCartHydrated);
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const totalQuantity = useSelector(
    selectCartTotalQuantity
  );

  if (!isHydrated) {
    return (
      <section
        className="cart-loading"
        aria-live="polite"
      >
        <p>Memuat keranjang...</p>
      </section>
    );
  }
  if (items.length === 0) {
    return (
      <section className="cart-page">
        <div className="cart-empty">
          <p className="eyebrow">Keranjang</p>
          <h1>Keranjang masih kosong</h1>
          <p>
            Pilih produk dari katalog dan tambahkan ke
            keranjang.
          </p>

          <Link href="/" className="primary-link">
            Lihat produk
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <div className="cart-page-header">
        <div>
          <p className="eyebrow">Keranjang</p>
          <h1>Keranjang belanja</h1>
        </div>

        <span>{totalQuantity} barang</span>
      </div>

      <div className="cart-layout">
        <div className="cart-list">
          {items.map((item) => (
            <article
              key={item.id}
              className="cart-item"
            >
              <Link
                href={`/products/${item.id}`}
                className="cart-item-image-container"
                aria-label={`Lihat detail ${item.title}`}
              >
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  sizes="120px"
                  className="cart-item-image"
                />
              </Link>

              <div className="cart-item-content">
                <Link
                  href={`/products/${item.id}`}
                  className="cart-item-title"
                >
                  {item.title}
                </Link>

                <p className="cart-item-unit-price">
                  {usdFormatter.format(item.price)}
                  {" "}per barang
                </p>

                <div className="quantity-control">
                  <button
                    type="button"
                    onClick={() =>
                      dispatch(decreaseQuantity(item.id))
                    }
                    disabled={item.quantity <= 1}
                    aria-label={`Kurangi jumlah ${item.title}`}
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    type="button"
                    onClick={() =>
                      dispatch(increaseQuantity(item.id))
                    }
                    disabled={item.quantity >= item.stock}
                    aria-label={`Tambah jumlah ${item.title}`}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="cart-item-actions">
                <strong>
                  {usdFormatter.format(
                    item.price * item.quantity
                  )}
                </strong>

                <button
                  type="button"
                  className="remove-item-button"
                  onClick={() =>
                    dispatch(removeItem(item.id))
                  }
                  aria-label={`Hapus ${item.title} dari keranjang`}
                >
                  Hapus
                </button>
              </div>
            </article>
          ))}
        </div>

        <aside className="cart-summary">
          <h2>Ringkasan belanja</h2>

          <div className="cart-summary-row">
            <span>Total barang</span>
            <span>{totalQuantity}</span>
          </div>

          <div className="cart-summary-row total">
            <span>Subtotal</span>
            <strong>
              {usdFormatter.format(subtotal)}
            </strong>
          </div>

          <Link href="/checkout" className="checkout-link">
            Lanjut ke checkout
          </Link>

          <Link href="/" className="secondary-link">
            Lanjut belanja
          </Link>

          <button
            type="button"
            className="clear-cart-button"
            onClick={() => dispatch(clearCart())}
          >
            Kosongkan keranjang
          </button>
        </aside>
      </div>
    </section>
  );
}