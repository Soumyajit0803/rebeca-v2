import React from "react";
import { ConfigProvider, theme } from "antd";
import { AuthProvider } from "./AuthContext";
import Dashboard from "./Components/Dashboard/Dashboard";

const themeColor = {
    admin: "#ef7f29",
    coordinator: "#9852f3",
    member: "#1668dc"
}

const App = () => {
    return (
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
                token: {
                    colorPrimary: themeColor.coordinator
                }
            }}
        >
            {/* <AuthProvider>
                <BrowserRouter>
                    <AllRoutes />
                </BrowserRouter>
            </AuthProvider> */}
            <AuthProvider>
                <Dashboard />
            </AuthProvider>
        </ConfigProvider>
    );
};
export default App;
