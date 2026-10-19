export default function HomePage() {
  return (
    <section>
      <div className="hero">
        <p className="eyebrow">Belajar Marketplace</p>

        <h1>Temukan produk yang kamu butuhkan</h1>

        <p className="hero-description">
          Marketplace sederhana yang dibuat menggunakan React,
          Next.js, dan Redux Toolkit.
        </p>
      </div>

      <section className="product-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Katalog</p>
            <h2>Produk terbaru</h2>
          </div>
        </div>

        <div className="empty-state">
          <h3>Produk akan segera ditampilkan</h3>
          <p>
            Pada tahap berikutnya, data produk akan diambil dari
            DummyJSON API.
          </p>
        </div>
      </section>
    </section>
  );
}