"use client";

import Link from "next/link";
import { useSelector } from "react-redux";

import useClientReady from "@/hooks/useClientReady";
import {
  selectCartTotalQuantity,
} from "@/store/features/cart/cartSlice";
import {
  selectWishlistCount,
} from "@/store/features/wishlist/wishlistSlice";

export default function Header() {
  const isClientReady = useClientReady();

  const totalQuantity = useSelector(
    selectCartTotalQuantity
  );

  const wishlistCount = useSelector(
    selectWishlistCount
  );

  const displayedCartCount = isClientReady
    ? totalQuantity
    : 0;

  const displayedWishlistCount = isClientReady
    ? wishlistCount
    : 0;

  return (
    <header className="site-header">
      <div className="container header-content">
        <Link href="/" className="site-logo">
          MiniMarket
        </Link>

        <nav className="site-navigation">
          <Link href="/">Produk</Link>

          <Link
            href="/wishlist"
            className="wishlist-link"
          >
            Favorit

            <span
              className="wishlist-badge"
              aria-label={`${displayedWishlistCount} produk favorit`}
            >
              {displayedWishlistCount}
            </span>
          </Link>

          <Link href="/cart" className="cart-link">
            Keranjang

            <span
              className="cart-badge"
              aria-label={`${displayedCartCount} barang di keranjang`}
            >
              {displayedCartCount}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}