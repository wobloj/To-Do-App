import React, { useState, useEffect, ReactNode } from "react";
import api from "../services/api";
import { AuthContext, AuthContextType, User } from "./AuthContext";

type Props = { children: ReactNode };

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // przy starcie aplikacji sprawdzamy czy backend widzi aktywną sesję
    api
      .get("/auth/me")
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const res = await api.post("/auth/login", { email, password });
    setUser(res.data.user); // backend już zapisuje token w cookie
  };

  const register = async (email: string, password: string) => {
    const res = await api.post("/auth/register", { email, password });
    setUser(res.data.user);
  };

  const logout = async () => {
    await api.post("/auth/logout"); // backend usuwa cookie
    setUser(null);
  };

  const value: AuthContextType = { user, loading, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
