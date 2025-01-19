import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const handleLogin = (userData) => {
        // Implement login logic here (e.g., API call)
        console.log("User just logged in!");
        
        setUser(userData);
    };

    const handleLogout = () => {
        // Implement logout logic here
        console.log("Logout the user!");
        
        setUser(null);
    };

    return <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
