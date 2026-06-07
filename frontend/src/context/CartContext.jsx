import { useState } from "react";
import { CartContext } from "./cart-context";

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const addToCart = (product) => {
    const exist = cart.find(item => item._id === product._id);

    if (exist) {
      setCart(cart.map(item =>
        item._id === product._id
          ? { ...item, qty: item.qty + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item._id !== id));
  };

  const toggleFavorite = (product) => {
    const exist = favorites.find(item => item._id === product._id);

    if (exist) {
      setFavorites(favorites.filter(item => item._id !== product._id));
    } else {
      setFavorites([...favorites, product]);
    }
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      favorites,
      toggleFavorite
    }}>
      {children}
    </CartContext.Provider>
  );
}