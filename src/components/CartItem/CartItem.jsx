import PropTypes from "prop-types";
import QuantityInput from "../QuantityInput/QuantityInput";

function CartItem({ item, onUpdateQuantity, onRemove }) {
  const handleChange = (value) => {
    const parsed = parseInt(value, 10);
    // Ignore empty/invalid typing; the +/- buttons and blur keep it valid
    if (!Number.isNaN(parsed)) {
      onUpdateQuantity(item.id, parsed);
    }
  };

  return (
    <article>
      <img src={item.image} alt={item.title} width="80" />
      <div>
        <h2>{item.title}</h2>
        <p>${item.price.toFixed(2)} each</p>
      </div>

      <QuantityInput
        value={item.quantity}
        onChange={handleChange}
        onIncrement={() => onUpdateQuantity(item.id, item.quantity + 1)}
        onDecrement={() => onUpdateQuantity(item.id, item.quantity - 1)}
        label={item.title}
      />

      <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>

      <button type="button" onClick={() => onRemove(item.id)}>
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