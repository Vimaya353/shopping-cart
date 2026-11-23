import { useState } from "react";
import PropTypes from "prop-types";
import QuantityInput from "../QuantityInput/QuantityInput";
import styles from "./ProductCard.module.css";

function ProductCard({ product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  const getValidQuantity = () => {
    const parsed = parseInt(quantity, 10);
    return Number.isNaN(parsed) || parsed < 1 ? 1 : parsed;
  };

  const handleIncrement = () => setQuantity(getValidQuantity() + 1);

  const handleDecrement = () =>
    setQuantity(Math.max(1, getValidQuantity() - 1));

  const handleAdd = () => {
    onAddToCart(product, getValidQuantity());
    setQuantity(1);
  };

  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <img className={styles.image} src={product.image} alt={product.title} />
      </div>
      <h2 className={styles.title}>{product.title}</h2>
      <p className={styles.price}>${product.price.toFixed(2)}</p>

      <div className={styles.actions}>
        <QuantityInput
          value={quantity}
          onChange={setQuantity}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          label={product.title}
        />
        <button type="button" className={styles.addButton} onClick={handleAdd}>
          Add To Cart
        </button>
      </div>
    </article>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductCard;