"use client";
import { createContext, useState, useEffect, useContext } from "react";
import jwt from "jwt-simple"; // Use jwt-simple instead of jsonwebtoken

const SECRET_KEY = "secretkey"; // Store this securely in environment variables

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwt.decode(token, SECRET_KEY);
        setUser(decoded);
      } catch {
        localStorage.removeItem("token");
      }
    }
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (existingUser) {
      const token = jwt.encode(
        { email, exp: Date.now() + 3600000 },
        SECRET_KEY
      );
      localStorage.setItem("token", token);
      setUser({ email });
      return true;
    }
    return false;
  };

  const signup = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find((user) => user.email === email)) {
      return false;
    }
    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));
    return true;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
