import React, { createContext, useState, useEffect } from "react";
import { API_LOGOUT } from '../services/endpoints';
import { post } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {    
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if (savedToken) {
            setToken(JSON.parse(savedToken));
        }
        setLoading(false); // Done loading
    }, []);

    const login = ({ access, refresh }) => {
        localStorage.setItem("token", JSON.stringify(access));
        localStorage.setItem("refresh_token", JSON.stringify(refresh));
        setToken(access);
      };

    const logout = async () => {
        try {
          const refreshToken = localStorage.getItem("refresh_token");
    
          if (refreshToken) {
            await post(API_LOGOUT, { refresh: JSON.parse(refreshToken) }, true);
        }
        } catch (err) {
          console.error("Logout error:", err);
        }
    
        // Always clear localStorage regardless of success
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        setToken(null);
      };

    return (
        <AuthContext.Provider value={{ token, login, logout, isAuthenticated: !!token, loading }}>
            {!loading && children} {/* if loading value is false render the children */}
        </AuthContext.Provider>
    );
};