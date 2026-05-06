import Link from "next/link";

export default function ProductCard({ product, onAddToCart }) {
  return (
    <article className="product-card">
      <Link href={`/product/${product._id}`} className="product-image">
        <img src={product.image} alt={product.name} />
      </Link>
      <div className="product-info">
        <div>
          <span className="product-category">{product.category}</span>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
        </div>
        <div className="product-details">
          <strong>${product.price.toFixed(2)}</strong>
          <button
            type="button"
            className="btn-primary"
            onClick={() => onAddToCart(product)}
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}
