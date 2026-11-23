import { NavLink } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav aria-label="Main navigation">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/shop">Shop</NavLink>
      <NavLink to="/cart">
        Cart
        {totalItems > 0 && (
          <span aria-label={`${totalItems} items in cart`}> ({totalItems})</span>
        )}
      </NavLink>
    </nav>
  );
}

export default Navbar;