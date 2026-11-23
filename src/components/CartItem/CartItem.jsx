import PropTypes from "prop-types";
import QuantityInput from "../QuantityInput/QuantityInput";
import styles from "./CartItem.module.css";

function CartItem({ item, onUpdateQuantity, onRemove }) {
  const handleChange = (value) => {
    const parsed = parseInt(value, 10);
    if (!Number.isNaN(parsed)) {
      onUpdateQuantity(item.id, parsed);
    }
  };

  return (
    <article className={styles.item}>
      <img className={styles.image} src={item.image} alt={item.title} />
      <div>
        <h2 className={styles.title}>{item.title}</h2>
        <p className={styles.unitPrice}>${item.price.toFixed(2)} each</p>
      </div>

      <QuantityInput
        value={item.quantity}
        onChange={handleChange}
        onIncrement={() => onUpdateQuantity(item.id, item.quantity + 1)}
        onDecrement={() => onUpdateQuantity(item.id, item.quantity - 1)}
        label={item.title}
      />

      <p className={styles.subtotal}>
        Subtotal: ${(item.price * item.quantity).toFixed(2)}
      </p>

      <button
        type="button"
        className={styles.remove}
        onClick={() => onRemove(item.id)}
      >
        Remove
      </button>
    </article>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  onUpdateQuantity: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default CartItem;