import React, { createContext, useContext, useState, useEffect } from "react";
import { logout, checkStatus } from "./api";
import {notification} from "antd"
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [profileStatus, setProfileStatus] = useState(false);

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

    const handleLogin = (adminData) => {
        console.log("Admin login successful");
        console.log(adminData);
        setAdmin(adminData);
        successPop(`Welcome, ${adminData.role} ${adminData.name.split(' ')[0]}`, "Login Successful");
    };

    const handleLogout = async () => {
        // Implement logout logic here
        console.log("Logout the Admin!");
        try {
            const res = await logout();
            console.log(res);
            successPop("Admin has been logged out", "Logout Successfully");
            setAdmin(null);
        } catch (err) {
            errorPop(err.message, "Error Logging out")
        }
    };

    return (
        <AuthContext.Provider value={{ admin, handleLogin, handleLogout, profileStatus, setProfileStatus }}>
            {contextHolder}
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
