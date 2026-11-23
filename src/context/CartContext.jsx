import { createContext,useContext,useState } from "react";
import PropTypes from "prop-types";


const CartContext = createContext(null);

export function CartProvider({children}) {
    const [items,setItems] = useState([]);

    const addToCart = (product,quantity) => {
        setItems((prev) => {
            const existing = prev.find((item) => item.id === product.id);

            if (existing) {
                return prev.map((item) =>
                    item.id === product.id
                      ? {...item, quantity: item.quantity + quantity}
                      : item
                );
            }
            return [
                ...prev,
                {
                    id:product.id,
                    title:product.title,
                    price:product.price,
                    image:product.image,
                    quantity,
                },
            ];
        });
    };

    const updateQuantity = (id,quantity) => {
        if (quantity < 1) {
            removeFromCart(id);
            return;
        }
        setItems((prev) =>
          prev.map((item) => (item.id === id ? { ...item, quantity } : item))
        );
    };

        const removeFromCart = (id) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const value = {
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        totalItems,
        totalPrice,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}


CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


export function useCart() {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error("useCart must be used inside a CartProvider");
  }
  return context;
}