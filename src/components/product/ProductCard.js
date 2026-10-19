import Image from "next/image";

const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function ProductCard({ product }) {
  const categoryName = product.category.replaceAll("-", " ");

  return (
    <article className="product-card">
      <div className="product-image-container">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="
            (max-width: 640px) 100vw,
            (max-width: 900px) 50vw,
            33vw
          "
          className="product-image"
        />
      </div>

      <div className="product-card-content">
        <p className="product-category">
          {categoryName}
        </p>

        <h3 className="product-title">
          {product.title}
        </h3>

        <p className="product-description">
          {product.description}
        </p>

        <div className="product-information">
          <span className="product-rating">
            ★ {Number(product.rating).toFixed(1)}
          </span>

          <span className="product-stock">
            Stok: {product.stock}
          </span>
        </div>

        <div className="product-card-footer">
          <strong className="product-price">
            {usdFormatter.format(product.price)}
          </strong>
        </div>
      </div>
    </article>
  );
}