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