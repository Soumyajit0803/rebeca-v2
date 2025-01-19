import { useState } from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import "./App.css";
import AllRoutes from "./Routes.jsx";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer.jsx";
import Footer2 from "./components/Footer2/Footer2.jsx";

import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./AuthContext.jsx";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#5075f6", // Light blue
        },
        secondary: {
            main: "#705dea", // Pink
        },
        background: {
            default: "#1a1a1a", // Dark background
            paper: "#1d1d1d", // Slightly lighter for cards, etc.
        },
        text: {
            primary: "#ffffff", // White text
            secondary: "#bdbdbd", // Grey text
        },
    },
});

function App() {
    // const [user, setUser] = useState(
    // 	JSON.parse(localStorage.getItem("user")) || null
    // );
    // const [authOpen, setAuthOpen] = useState(false);
    // const [emailVerificationOpen, setEmailVerificationOpen] = useState(false);

    // const login = (userData, jwt) => {
    // 	setUser(userData);
    // 	localStorage.setItem("user", JSON.stringify(userData));
    // 	localStorage.setItem("jwt", JSON.stringify(jwt));
    // };
    // const logout = () => {
    // 	setUser(null);
    // 	localStorage.setItem("user", JSON.stringify(null));
    // 	localStorage.removeItem("jwt");
    // };

    // const handleAuthOpen = () => {
    // 	setAuthOpen(true);
    // };
    // const handleAuthClose = () => {
    // 	setAuthOpen(false);
    // };

    return (
        <GoogleOAuthProvider clientId="43400313430-llj3qp9nojmnqmmv578q0goo7fbemoe3.apps.googleusercontent.com">
            <div className="App">
                <ThemeProvider theme={darkTheme}>
                    <CssBaseline />
                    <SpeedInsights />
                    <Analytics />
                    <AuthProvider>
                        <Router>
                            <Navbar></Navbar>
                            <AllRoutes></AllRoutes>
                            {/* <Footer></Footer> */}
                            <Footer2></Footer2>
                        </Router>
                    </AuthProvider>
                </ThemeProvider>
            </div>
        </GoogleOAuthProvider>
    );
}

export default App;
