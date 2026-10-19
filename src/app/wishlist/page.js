"use client";

import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

import AddToCartButton from "@/components/product/AddToCartButton";
import WishlistButton from "@/components/product/WishlistButton";
import {
  selectWishlistHydrated,
  selectWishlistItems,
} from "@/store/features/wishlist/wishlistSlice";
import useClientReady from "@/hooks/useClientReady";

const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function WishlistPage() {
  const isClientReady = useClientReady();
  const isHydrated = useSelector(
    selectWishlistHydrated
  );

  const items = useSelector(selectWishlistItems);

  if (!isClientReady || !isHydrated) {
    return (
      <section
        className="cart-loading"
        aria-live="polite"
      >
        <p>Memuat produk favorit...</p>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="wishlist-page">
        <div className="wishlist-empty">
          <p className="eyebrow">Favorit</p>
          <h1>Belum ada produk favorit</h1>

          <p>
            Tandai produk yang kamu suka agar mudah
            ditemukan kembali.
          </p>

          <Link href="/" className="primary-link">
            Lihat produk
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="wishlist-page">
      <div className="wishlist-page-header">
        <div>
          <p className="eyebrow">Favorit</p>
          <h1>Produk favorit</h1>
        </div>

        <span>{items.length} produk</span>
      </div>

      <div className="wishlist-list">
        {items.map((item) => (
          <article
            key={item.id}
            className="wishlist-item"
          >
            <Link
              href={`/products/${item.id}`}
              className="wishlist-image-container"
              aria-label={`Lihat detail ${item.title}`}
            >
              <Image
                src={item.thumbnail}
                alt={item.title}
                fill
                sizes="
                  (max-width: 640px) 100vw,
                  180px
                "
                className="wishlist-image"
              />
            </Link>

            <div className="wishlist-item-content">
              <Link
                href={`/products/${item.id}`}
                className="wishlist-item-title"
              >
                {item.title}
              </Link>

              <p>
                Stok: {item.stock}
              </p>

              <strong>
                {usdFormatter.format(item.price)}
              </strong>
            </div>

            <div className="wishlist-item-actions">
              <AddToCartButton product={item} />
              <WishlistButton product={item} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}