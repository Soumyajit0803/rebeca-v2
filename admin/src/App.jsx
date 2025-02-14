import React from "react";
import { ConfigProvider, theme } from "antd";
import { AuthProvider } from "./AuthContext";
import Dashboard from "./Components/Dashboard/Dashboard";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AllRoutes from "./Routes";
import { BrowserRouter } from "react-router-dom";

const client_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const themeColor = {
    admin: "#ef7f29",
    coordinator: "#9852f3",
    member: "#1668dc",
};

const App = () => {
    return (
        <GoogleOAuthProvider clientId={client_ID}>
            <ConfigProvider
                theme={{
                    algorithm: theme.darkAlgorithm,
                    token: {
                        colorPrimary: themeColor.coordinator,
                    },
                }}
            >
                {/* <AuthProvider>
                <BrowserRouter>
                    <AllRoutes />
                </BrowserRouter>
            </AuthProvider> */}
                <AuthProvider>
                    <BrowserRouter>
                        <AllRoutes />
                    </BrowserRouter>
                </AuthProvider>
            </ConfigProvider>
        </GoogleOAuthProvider>
    );
};
export default App;
