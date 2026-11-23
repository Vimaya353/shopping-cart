import { NavLink } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import styles from "./Navbar.module.css";

const linkClass = ({ isActive }) =>
  isActive ? `${styles.link} ${styles.active}` : styles.link;

function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className={styles.nav} aria-label="Main navigation">
      <span className={styles.brand}>MyStore</span>
      <div className={styles.links}>
        <NavLink to="/" end className={linkClass}>
          Home
        </NavLink>
        <NavLink to="/shop" className={linkClass}>
          Shop
        </NavLink>
        <NavLink to="/cart" className={linkClass}>
          Cart
          {totalItems > 0 && (
            <span className={styles.badge} aria-label={`${totalItems} items in cart`}>
              {totalItems}
            </span>
          )}
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;