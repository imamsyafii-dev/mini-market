"use client";

import Link from "next/link";
import { useSelector } from "react-redux";

import { selectCartTotalQuantity } from "@/store/features/cart/cartSlice";

export default function Header() {
  const totalQuantity = useSelector(
    selectCartTotalQuantity
  );

  return (
    <header className="site-header">
      <div className="container header-content">
        <Link href="/" className="site-logo">
          MiniMarket
        </Link>

        <nav className="site-navigation">
          <Link href="/">Produk</Link>

          <Link href="/cart" className="cart-link">
            Keranjang

            <span
              className="cart-badge"
              aria-label={`${totalQuantity} barang di keranjang`}
            >
              {totalQuantity}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}