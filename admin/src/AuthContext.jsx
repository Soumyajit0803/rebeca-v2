import React, { createContext, useContext, useState } from "react";
import { logoutUser } from "./api";
import {notification} from "antd"

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const [notificationApi, contextHolder] = notification.useNotification();
    const infoPop = (e, message = '') => {
        notificationApi.open({
            message: message || "Information",
            type: "info",
            description: e,
            placement: "topRight"
        });
    };
    const errorPop = (e, message = '') => {
        notificationApi.open({
            message: message || "Some Error Occured",
            type: "error",
            description: e,
            placement: "topRight"
        });
    };
    const successPop = (e, message = '') => {
        notificationApi.open({
            message: message || "Congratulations",
            type: "success",
            description: e,
            placement: "topRight"
        });
    };

    const handleLogin = (userData) => {
        console.log("User login successful");
        console.log(userData);
        setUser(userData);
        successPop(`Welcome, ${userData.name.split(' ')[0]}`, "Login Successful");
    };

    const handleLogout = async () => {
        // Implement logout logic here
        console.log("Logout the user!");
        try {
            const res = await logoutUser();
            console.log(res);
            successPop("User has been logged out", "Logout Successfully");
            setUser(null);
        } catch (err) {
            errorPop(err.message, "Error Logging out")
        }
    };

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
            {contextHolder}
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
