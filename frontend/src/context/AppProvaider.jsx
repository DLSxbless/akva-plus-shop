import { useState, useEffect } from "react";
import { AppContext } from "./AppContext";

export function AppProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [favorites, setFavorites] = useState([]);

  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    return token ? { token } : null;
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const exist = cart.find(i => i._id === product._id);

    if (exist) {
      setCart(cart.map(i =>
        i._id === product._id ? { ...i, qty: i.qty + 1 } : i
      ));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(i => i._id !== id));
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const toggleFavorite = (product) => {
    const exist = favorites.find(f => f._id === product._id);

    if (exist) {
      setFavorites(favorites.filter(f => f._id !== product._id));
    } else {
      setFavorites([...favorites, product]);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        total,

        favorites,
        toggleFavorite,

        user,
        setUser,
        logout
      }}
    >
      {children}
    </AppContext.Provider>
  );
}