import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(localStorage.getItem('user') ?? null);

  const login = useCallback((username, password) => {
    // Check hardcoded credentials
    if (username === 'a' && password === 'a') {
      setUser(username);
      localStorage.setItem('user', JSON.stringify(username));
    } else {
      setUser(null);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
    navigate("/login")
  }, [setUser, navigate]);

  const isAuthenticated = useMemo(() => !!user, [user]);

  const contextValue = useMemo(() => ({ user, login, logout, isAuthenticated }), [
    user,
    login,
    logout,
    isAuthenticated,
  ]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
