import { useState, useEffect } from "react";
import { Drawer, Avatar, Menu, MenuItem, IconButton, Typography, Button, Box } from "@mui/material";
import ResponsiveDrawer from "./ResponsiveDrawer";

// import {Button} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import CustomButton from "../Button/Button";
import "./Navbar.css";
import Progressbar from "../Progressbar/Progressbar";
// import { LogoutOutlined, ExportOutlined } from "@ant-design/icons";

import LoginForm from "../Login/LoginForm";
import React from "react";
import { useAuth } from "../../AuthContext";
import { checkStatus } from "../../services/authApi";
import AccountMenu from "../AccountMenu/AccountMenu";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { innerWidth: width, innerHeight: height } = window;
    const [loginOpen, setLoginOpen] = useState(false);

    const { user, handleLogin, handleLogout } = useAuth();
    const isLoggedIn = async () => {
        try {
            const res = await checkStatus();
            if (!res.data.user) return;
            console.log(res?.data?.message);
            handleLogin(res?.data?.user);
        } catch (err) {
            console.log("status check fail");
            console.log(err.message);
        }
    };

    useEffect(() => {
        isLoggedIn();
    }, []);

    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };
    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    const handleLinkClick = () => {
        handleDrawerClose();
    };

    return (
        <>
            <div className="navbar">
                <Progressbar />

                {/* {user && <Notification message={`Welcome, ${user.name.split(' ')[0]}`} />} */}
                <LoginForm open={loginOpen} setOpen={setLoginOpen} />
                <div className="left-col">
                    {width < 720 && (
                        <IconButton
                            id="drawer-open-btn"
                            onClick={handleDrawerOpen}
                            variant="filled"
                            color="primary"
                            
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Link to="/">
                        <img
                            src="/assets/logo/logo_white.webp"
                            alt="rebeca_logo"
                            style={{ padding: "1rem 0px", width: "100px", marginLeft: "10px" }}
                        />
                    </Link>
                </div>

                <div className="nav-items">
                    {width >= 720 && (
                        <>
                            <NavLink id="nav-home" className={"item"} to="/">
                                Home
                            </NavLink>
                            <NavLink id="nav-events" className={"item"} to="/events">
                                Events
                            </NavLink>

                            <NavLink to="/sponsorship" id="nav-sponsorship" className={"item"}>
                                Sponsorship
                            </NavLink>
                            <NavLink id="nav-team" to="/team" className={"item"}>
                                Our Team
                            </NavLink>
                            <NavLink id="nav-merchandise" to="/merchandise" className={"item"}>
                                Merchandise
                            </NavLink>

                            {/* {user ? (
                                <AvatarMenu user={user} handleLogout={handleLogout} />
                            ) : (
                                <div className="">
                                    <Button
                                        variant="filled"
                                        innerText={"Log in"}
                                        onClick={() => setLoginOpen((t) => t ^ 1)}
                                    />
                                </div>
                            )} */}
                            <AccountMenu />
                        </>
                    )}
                    {width < 720 && (
                        <Box
                            sx={{
                                display: "flex",
                            }}
                        >
                            <AccountMenu />
                        </Box>
                    )}
                </div>
            </div>

            <ResponsiveDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
        </>
    );
};

export default Navbar;
