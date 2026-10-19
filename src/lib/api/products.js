const API_BASE_URL = "https://dummyjson.com";

export async function getProducts({
  limit = 12,
  search = "",
  category = "",
} = {}) {
  const query = new URLSearchParams();
  let endpoint = "/products";

  if (category) {
    endpoint =
      `/products/category/${encodeURIComponent(category)}`;

    query.set(
      "limit",
      search ? "0" : String(limit)
    );
  } else if (search) {
    endpoint = "/products/search";
    query.set("q", search);
    query.set("limit", String(limit));
  } else {
    query.set("limit", String(limit));
  }

  const response = await fetch(
    `${API_BASE_URL}${endpoint}?${query.toString()}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      `Gagal mengambil produk: ${response.status}`
    );
  }

  const data = await response.json();

  if (!Array.isArray(data.products)) {
    throw new Error("Format data produk tidak valid");
  }

  let products = data.products;

  /*
   * DummyJSON tidak menyediakan endpoint khusus untuk
   * kombinasi category dan search.
   *
   * Jika keduanya aktif, produk kategori sudah diambil
   * terlebih dahulu, lalu keyword difilter di server.
   */
  if (category && search) {
    const keyword = search.toLocaleLowerCase("id-ID");

    products = products.filter((product) =>
      [
        product.title,
        product.description,
        product.brand,
      ].some((value) =>
        String(value ?? "")
          .toLocaleLowerCase("id-ID")
          .includes(keyword)
      )
    );
  }

  return products.slice(0, limit);
}

export async function getCategories() {
  const response = await fetch(
    `${API_BASE_URL}/products/categories`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      `Gagal mengambil kategori: ${response.status}`
    );
  }

  const categories = await response.json();

  if (!Array.isArray(categories)) {
    throw new Error("Format kategori tidak valid");
  }

  return categories.filter(
    (item) =>
      typeof item?.slug === "string" &&
      typeof item?.name === "string"
  );
}

export async function getProductById(id) {
  const response = await fetch(
    `${API_BASE_URL}/products/${id}`,
    {
      cache: "no-store",
    }
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(
      `Gagal mengambil detail produk: ${response.status}`
    );
  }

  const product = await response.json();

  if (!product || typeof product.id !== "number") {
    throw new Error("Format detail produk tidak valid");
  }

  return product;
}