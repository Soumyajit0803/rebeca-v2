import { useState, useEffect } from "react";
import { Drawer, Avatar, Menu, MenuItem, IconButton, Typography, Button, Box } from "@mui/material";

// import {Button} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import CustomButton from "../Button/Button";
import "./Navbar.css";
import Progressbar from "../Progressbar/Progressbar";
import { LogoutOutlined, ExportOutlined } from "@ant-design/icons";

import LoginForm from "../Login/LoginForm";
import React from "react";
import { useAuth } from "../../AuthContext";
import { checkStatus } from "../../services/api";
import AccountMenu from "../AccountMenu/AccountMenu";
import MenuIcon from "@mui/icons-material/Menu";
import { Close } from "@mui/icons-material";

function AvatarMenu({ user, handleLogout, setOpen }) {
    const [anchorEl, setAnchorEl] = useState(null); // Menu anchor state

    // Open the menu when avatar is clicked
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Close the menu
    const handleClose = () => {
        setAnchorEl(null);
    };

    if (!user) {
        return <AccountMenu />;
    }

    return (
        <div>
            <IconButton onClick={handleClick}>
                <Avatar alt={user.name} src={user.image}></Avatar>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)} // Menu will open if anchorEl is not null
                onClose={handleClose} // Close the menu when clicking outside
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                sx={{ top: "60px" }}
            >
                <Typography sx={{ p: 1 }} variant="body2">
                    Hi, {user.name.split(" ")[0]}!
                </Typography>
                <MenuItem
                    onClick={() => {
                        handleClose();
                        handleLogout();
                    }}
                    sx={{ gap: "10px" }}
                >
                    Logout <LogoutOutlined />
                </MenuItem>
            </Menu>
        </div>
    );
}

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
                    <IconButton id="drawer-open-btn" onClick={handleDrawerOpen} variant="filled" color="white">
                        <MenuIcon />
                    </IconButton>
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
            <Drawer variant="persistent" anchor="left" open={drawerOpen} className="drawer">
                <div className="bg"></div>
                <Box
                    sx={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "1rem",
                    }}
                >
                    <Link to="/" className="logo">
                        <img style={{ padding: "5px", width: "150px" }} src="/assets/logo/logo_white.webp" alt="" />
                    </Link>
                    <IconButton id="drawer-close-btn" onClick={handleDrawerClose} color="white">
                        <Close />
                    </IconButton>
                </Box>
                <div className="nav-items">
                    <NavLink className={"item"} to="/" onClick={handleLinkClick}>
                        Home
                    </NavLink>
                    <NavLink className={"item"} to="/events" onClick={handleLinkClick}>
                        Events
                    </NavLink>
                    <NavLink className={"item"} to="/sponsorship" onClick={handleLinkClick}>
                        Sponsorship
                    </NavLink>
                    <NavLink to="/team" onClick={handleLinkClick} className={"item"}>
                        Our Team
                    </NavLink>
                    <NavLink to="/merchandise" onClick={handleLinkClick} className={"item"}>
                        Merchandise
                    </NavLink>
                    {/* <NavLink
						onClick={handleLinkClick}
						to="/faq"
						className={"item"}
					>
						FAQs
					</NavLink> */}
                </div>
            </Drawer>
        </>
    );
};

export default Navbar;
