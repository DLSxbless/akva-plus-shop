import { useState } from "react";
import { api } from "../api";

export function useAuth() {
  // ✅ сразу берём токен (без useEffect)
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    return token ? { token } : null;
  });

  const login = async (email, password) => {
    const data = await api.login(email, password);
    localStorage.setItem("token", data.token);
    setUser({ token: data.token });
  };

  const register = async (email, password) => {
    const data = await api.register(email, password);
    localStorage.setItem("token", data.token);
    setUser({ token: data.token });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return { user, login, register, logout };
}