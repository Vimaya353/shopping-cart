import useProducts from "../../hooks/useProducts";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useCart } from "../../context/CartContext";
import styles from "./Shop.module.css";

function Shop() {
  const { products, loading, error } = useProducts();
  const { addToCart } = useCart();

  if (loading) return <p className={styles.message}>Loading products...</p>;
  if (error)
    return <p className={styles.message}>Something went wrong: {error}</p>;

  return (
    <section>
      <h1>Shop</h1>
      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={addToCart}
          />
        ))}
      </div>
    </section>
  );
}

export default Shop;