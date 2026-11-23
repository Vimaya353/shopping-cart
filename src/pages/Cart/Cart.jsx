import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import CartItem from "../../components/CartItem/CartItem";
import styles from "./Cart.module.css";

function Cart() {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <section className={styles.empty}>
        <h1>Your cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/shop" className={styles.shopLink}>
          Continue shopping
        </Link>
      </section>
    );
  }

  return (
    <section>
      <h1>Your cart</h1>
      <div className={styles.list}>
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
          />
        ))}
      </div>
      <div className={styles.summary}>
        <p className={styles.total}>
          <strong>Total: ${totalPrice.toFixed(2)}</strong>
        </p>
        <button type="button" className={styles.checkout}>
          Checkout
        </button>
      </div>
    </section>
  );
}

export default Cart;