import React, { createContext, useContext, useState } from "react";
import { logoutUser } from "./services/authApi";
import useNotification from "./hooks/useNotification";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const { Notification, showNotification } = useNotification();

    const handleLogin = (userData) => {
        console.log("User login successful");
        console.log(userData);
        setUser(userData);
        showNotification(`Welcome, ${userData.name.split(' ')[0]}`);
    };

    const handleLogout = async () => {
        // Implement logout logic here
        console.log("Logout the user!");
        try {
            const res = await logoutUser();
            console.log(res);
            showNotification("Logout successfully");
            setUser(null);
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
            <Notification />
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
