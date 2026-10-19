const API_BASE_URL = "https://dummyjson.com";

export async function getProducts(limit = 12) {
  const response = await fetch(
    `${API_BASE_URL}/products?limit=${limit}`,
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

  return data.products;
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