import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import AddToCartButton from "@/components/product/AddToCartButton";
import WishlistButton from "@/components/product/WishlistButton";
import { getProductById } from "@/lib/api/products";

const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const productId = Number(id);

  if (!Number.isInteger(productId) || productId <= 0) {
    notFound();
  }

  const product = await getProductById(productId);

  if (!product) {
    notFound();
  }

  const categoryName = product.category.replaceAll("-", " ");
  const imageUrl = product.images?.[0] ?? product.thumbnail;
  const productSnapshot = {
    id: product.id,
    title: product.title,
    price: product.price,
    thumbnail: product.thumbnail,
    stock: product.stock,
  };

  return (
    <section className="product-detail-page">
      <Link href="/" className="back-link">
        ← Kembali ke katalog
      </Link>

      <div className="product-detail-layout">
        <div className="product-detail-image-container">
          <Image
            src={imageUrl}
            alt={product.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="product-detail-image"
          />
        </div>

        <div className="product-detail-content">
          <p className="product-category">
            {categoryName}
          </p>

          <h1>{product.title}</h1>

          <div className="product-detail-meta">
            <span className="product-rating">
              ★ {Number(product.rating).toFixed(1)}
            </span>

            <span>Stok: {product.stock}</span>
          </div>

          <p className="product-detail-description">
            {product.description}
          </p>

          <strong className="product-detail-price">
            {usdFormatter.format(product.price)}
          </strong>

          <div className="product-detail-actions">
            <AddToCartButton product={productSnapshot} />

            <WishlistButton product={productSnapshot} />
          </div>

          <dl className="product-detail-facts">
            {product.brand && (
              <div>
                <dt>Merek</dt>
                <dd>{product.brand}</dd>
              </div>
            )}

            <div>
              <dt>Kategori</dt>
              <dd>{categoryName}</dd>
            </div>

            {product.availabilityStatus && (
              <div>
                <dt>Status</dt>
                <dd>{product.availabilityStatus}</dd>
              </div>
            )}

            {product.warrantyInformation && (
              <div>
                <dt>Garansi</dt>
                <dd>{product.warrantyInformation}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </section>
  );
}