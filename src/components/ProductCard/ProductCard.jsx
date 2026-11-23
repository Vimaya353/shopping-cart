import { useState } from "react";
import PropTypes from "prop-types";
import QuantityInput from "../QuantityInput/QuantityInput";

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
    <article>
      <img src={product.image} alt={product.title} width="120" />
      <h2>{product.title}</h2>
      <p>${product.price.toFixed(2)}</p>

      <QuantityInput
        value={quantity}
        onChange={setQuantity}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        label={product.title}
      />

      <button type="button" onClick={handleAdd}>
        Add To Cart
      </button>
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