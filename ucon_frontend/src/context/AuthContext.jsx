import React, { createContext, useState, useEffect } from "react";

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

    const login = (newToken) => {
        localStorage.setItem("token", JSON.stringify(newToken));
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, login, logout, isAuthenticated: !!token, loading }}>
            {!loading && children} {/* Render children only after loading */}
        </AuthContext.Provider>
    );
};