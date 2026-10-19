import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-content">
        <Link href="/" className="site-logo">
          MiniMarket
        </Link>

        <nav className="site-navigation">
          <Link href="/">Produk</Link>
          <Link href="/cart">Keranjang</Link>
        </nav>
      </div>
    </header>
  );
}