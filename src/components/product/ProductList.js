import ProductCard from "./ProductCard";

export default function ProductList({ products }) {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <h3>Produk belum tersedia</h3>
        <p>Silakan coba kembali beberapa saat lagi.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}