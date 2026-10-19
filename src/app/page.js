import ProductFilters from "@/components/product/ProductFilters";
import ProductList from "@/components/product/ProductList";
import {
  getCategories,
  getProducts,
} from "@/lib/api/products";

function readSearchParam(value) {
  if (Array.isArray(value)) {
    return value[0]?.trim() ?? "";
  }

  return typeof value === "string"
    ? value.trim()
    : "";
}

export default async function HomePage({
  searchParams,
}) {
  const params = await searchParams;

  const search = readSearchParam(params.q);
  const requestedCategory = readSearchParam(
    params.category
  );

  const categories = await getCategories();

  const category = categories.some(
    (item) => item.slug === requestedCategory
  )
    ? requestedCategory
    : "";

  const products = await getProducts({
    limit: 12,
    search,
    category,
  });

  const hasFilters = Boolean(search || category);

  return (
    <section>
      <div className="hero">
        <p className="eyebrow">
          Belajar Marketplace
        </p>

        <h1>
          Temukan produk yang kamu butuhkan
        </h1>

        <p className="hero-description">
          Marketplace sederhana yang dibuat menggunakan
          React, Next.js, dan Redux Toolkit.
        </p>
      </div>

      <section className="product-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Katalog</p>

            <h2>
              {hasFilters
                ? "Hasil pencarian"
                : "Produk terbaru"}
            </h2>
          </div>
        </div>

        <ProductFilters
          categories={categories}
          search={search}
          category={category}
        />

        <ProductList
          products={products}
          emptyTitle={
            hasFilters
              ? "Produk tidak ditemukan"
              : "Produk belum tersedia"
          }
          emptyMessage={
            hasFilters
              ? "Coba gunakan kata kunci atau kategori yang berbeda."
              : "Silakan coba kembali beberapa saat lagi."
          }
        />
      </section>
    </section>
  );
}