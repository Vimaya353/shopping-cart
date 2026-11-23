import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import CartItem from "../../components/CartItem/CartItem";

function Cart() {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <section>
        <h1>Your cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/shop">Continue shopping</Link>
      </section>
    );
  }

  return (
    <section>
      <h1>Your cart</h1>
      {items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
        />
      ))}
      <p>
        <strong>Total: ${totalPrice.toFixed(2)}</strong>
      </p>
      <button type="button">Checkout</button>
    </section>
  );
}

export default Cart;