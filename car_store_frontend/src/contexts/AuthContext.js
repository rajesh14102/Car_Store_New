// src/contexts/AuthContext.js

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(() => {
    const storedIsAdmin = localStorage.getItem('isAdmin');
    return storedIsAdmin === 'true' ? true : false;
  });

  const login = (username, password) => {
    if (username === 'admin' && password === 'admin') {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true'); // ✅ Save login in localStorage
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin'); // ✅ Clear localStorage on logout
  };

  useEffect(() => {
    // In case needed for future checks
  }, []);

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
