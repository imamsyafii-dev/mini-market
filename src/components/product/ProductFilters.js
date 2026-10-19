import Form from "next/form";
import Link from "next/link";

export default function ProductFilters({
  categories,
  search,
  category,
}) {
  const hasFilters = Boolean(search || category);

  return (
    <Form action="/" className="product-filters">
      <div className="filter-field search-field">
        <label htmlFor="product-search">
          Cari produk
        </label>

        <input
          id="product-search"
          name="q"
          type="search"
          defaultValue={search}
          placeholder="Contoh: phone"
        />
      </div>

      <div className="filter-field">
        <label htmlFor="product-category">
          Kategori
        </label>

        <select
          id="product-category"
          name="category"
          defaultValue={category}
        >
          <option value="">Semua kategori</option>

          {categories.map((item) => (
            <option
              key={item.slug}
              value={item.slug}
            >
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="filter-submit-button"
      >
        Terapkan
      </button>

      {hasFilters && (
        <Link href="/" className="filter-reset-link">
          Reset
        </Link>
      )}
    </Form>
  );
}