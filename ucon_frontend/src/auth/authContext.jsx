// src/auth/authContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(() => {
    const tokens = localStorage.getItem('tokens');
    return tokens ? JSON.parse(tokens) : null;
  });

  const login = async (user_email, password) => {
    const response = await axios.post('/login/', { user_email, password });
    const tokens = response.data.tokens;
    localStorage.setItem('tokens', JSON.stringify(tokens));
    setAuth(tokens);
    navigate('/dashboard');
  };

  const logout = async () => {
    if (auth?.refresh) {
      await axios.post('/logout/', { refresh: auth.refresh });
    }
    localStorage.removeItem('tokens');
    setAuth(null);
    navigate('/login');
  };

  const value = { auth, login, logout, setAuth };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
