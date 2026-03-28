import React, { createContext, useState, useEffect } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const storedUser = localStorage.getItem("user");

  let initialUser = null;

  if (storedUser && storedUser !== "undefined" && storedUser !== "null") {
    try {
      initialUser = JSON.parse(storedUser);
    } catch {
      initialUser = null;
    }
  }

  const [user, setUser] = useState(initialUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const token = localStorage.getItem("access");

    if (token) {
      api.get("auth/me/")
        .then(res => {
          setUser(res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
        })
        .catch(() => logout());
    }

    setLoading(false);

  }, []);

  const login = async (email, password) => {

    const res = await api.post("auth/login/", {
      email,
      password
    });

    localStorage.setItem("access", res.data.access);
    localStorage.setItem("refresh", res.data.refresh);

    const userRes = await api.get("auth/me/");

    setUser(userRes.data);
    localStorage.setItem("user", JSON.stringify(userRes.data));
  };

  const register = async (data) => {
    await api.post("auth/register/", data);
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
    setUser(null);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};