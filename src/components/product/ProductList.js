import ProductCard from "./ProductCard";

export default function ProductList({
  products,
  emptyTitle = "Produk belum tersedia",
  emptyMessage = "Silakan coba kembali beberapa saat lagi.",
}) {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <h3>{emptyTitle}</h3>
        <p>{emptyMessage}</p>
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