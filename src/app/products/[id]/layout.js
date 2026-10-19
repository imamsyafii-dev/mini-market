import { getProductById } from "@/lib/api/products";

const notFoundMetadata = {
  title: "Produk Tidak Ditemukan",
  description:
    "Produk yang kamu cari tidak tersedia di MiniMarket.",
};

export async function generateMetadata({ params }) {
  const { id } = await params;
  const productId = Number(id);

  if (
    !Number.isInteger(productId) ||
    productId <= 0
  ) {
    return notFoundMetadata;
  }

  const product = await getProductById(productId);

  if (!product) {
    return notFoundMetadata;
  }

  return {
    title: product.title,
    description: product.description,

    openGraph: {
      title: product.title,
      description: product.description,
      type: "website",

      images: [
        {
          url: product.thumbnail,
          alt: product.title,
        },
      ],
    },
  };
}

export default function ProductDetailLayout({
  children,
}) {
  return children;
}