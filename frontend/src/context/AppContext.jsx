import { createContext, useState, useEffect, useCallback, useMemo } from "react";
import { api } from "../api";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setAuthLoading(false);
      return;
    }

    const loadUser = async () => {
      try {
        const data = await api.getMe(token);
        setUser(data);
      } catch {
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    };

    loadUser();
  }, []);

  const addToCart = useCallback((product) => {
    setCart((prev) => {
      const exist = prev.find((p) => p._id === product._id);
      if (exist) {
        return prev.map((p) =>
          p._id === product._id ? { ...p, qty: (p.qty || 1) + 1 } : p
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }, []);

  const increaseQty = useCallback((id) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, qty: (item.qty || 1) + 1 } : item
      )
    );
  }, []);

  const decreaseQty = useCallback((id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item._id === id ? { ...item, qty: Math.max(1, (item.qty || 1) - 1) } : item
        )
        .filter((item) => item.qty > 0)
    );
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart((prev) => prev.filter((p) => p._id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const toggleFavorite = useCallback((product) => {
    setFavorites((prev) => {
      const exist = prev.find((p) => p._id === product._id);
      if (exist) {
        return prev.filter((p) => p._id !== product._id);
      }
      return [...prev, product];
    });
  }, []);

  const favoriteIds = useMemo(() => new Set(favorites.map((f) => f._id)), [favorites]);
  const total = useMemo(
    () => cart.reduce((sum, p) => sum + Number(p.price || 0) * Number(p.qty || 1), 0),
    [cart]
  );
  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + Number(item.qty || 1), 0),
    [cart]
  );

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      increaseQty,
      decreaseQty,
      removeFromCart,
      clearCart,
      total,
      cartCount,
      favorites,
      favoriteIds,
      toggleFavorite,
      user,
      setUser,
      authLoading,
    }),
    [
      cart,
      addToCart,
      increaseQty,
      decreaseQty,
      removeFromCart,
      clearCart,
      total,
      cartCount,
      favorites,
      favoriteIds,
      toggleFavorite,
      user,
      authLoading,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
