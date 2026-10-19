import ProductList from "@/components/product/ProductList";
import { getProducts } from "@/lib/api/products";

export default async function HomePage() {
  const products = await getProducts(12);

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

        <ProductList products={products} />
      </section>
    </section>
  );
}