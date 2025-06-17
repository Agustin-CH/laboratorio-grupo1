import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser]   = useState(null);
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const storedUser  = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    let initialUser = null;
    if (storedUser) {
      try {
        initialUser = JSON.parse(storedUser);
      } catch {
        // Valor inválido en localStorage: lo limpiamos
        localStorage.removeItem("user");
      }
    }

    if (initialUser && storedToken) {
      setUser(initialUser);
      setToken(storedToken);
    }

    setReady(true);
  }, []);

  const login = (userData, jwt) => {
    setUser(userData);
    setToken(jwt);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", jwt);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    // Redirección se hace desde el componente que invoque logout
  };

  return (
    <AuthContext.Provider value={{ user, token, ready, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
