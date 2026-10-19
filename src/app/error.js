"use client";

import Link from "next/link";

export default function ErrorPage({ reset }) {
  return (
    <section className="error-state" role="alert">
      <p className="eyebrow">Terjadi kesalahan</p>

      <h1>Halaman belum bisa dimuat</h1>

      <p>
        Koneksi ke layanan produk mungkin sedang bermasalah. Coba muat kembali
        halaman ini.
      </p>

      <div className="error-actions">
        <button
          type="button"
          className="retry-button"
          onClick={() => reset()}
        >
          Coba lagi
        </button>

        <Link href="/" className="filter-reset-link">
          Kembali ke katalog
        </Link>
      </div>
    </section>
  );
}