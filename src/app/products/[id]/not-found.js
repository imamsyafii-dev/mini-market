import Link from "next/link";

export default function ProductNotFound() {
  return (
    <section className="not-found">
      <p className="eyebrow">404</p>

      <h1>Produk tidak ditemukan</h1>

      <p>
        Produk yang kamu cari mungkin sudah tidak tersedia
        atau alamatnya tidak benar.
      </p>

      <Link href="/" className="primary-link">
        Kembali ke katalog
      </Link>
    </section>
  );
}