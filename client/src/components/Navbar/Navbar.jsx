import { useState, useEffect } from "react";
import {
    Drawer,
    Divider,
    Avatar,
    Menu,
    MenuItem,
    IconButton,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Stack,
    Typography,
    Snackbar,
    Alert
} from "@mui/material";

// import {Button} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import Button from "../Button/Button";
import "./Navbar.css";
import Progressbar from "../Progressbar/Progressbar";

import LoginForm from "../Login/LoginForm";
import React from "react";
import { useAuth } from "../../AuthContext";
import { checkStatus } from "../../services/api";

function AvatarMenu({ user, handleLogout }) {
    const [anchorEl, setAnchorEl] = useState(null); // Menu anchor state

    // Open the menu when avatar is clicked
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Close the menu
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton onClick={handleClick}>
                <Avatar alt={user.name} src={user.image}>
                </Avatar>
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
            >
                <Typography sx={{p:1}} variant="body2">Hi, {user.name.split(' ')[0]}!</Typography>
                <MenuItem onClick = {()=>{
                    handleClose();
                    handleLogout()
                }}>Logout</MenuItem>
            </Menu>
        </div>
    );
}

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { innerWidth: width, innerHeight: height } = window;
    const [loginOpen, setLoginOpen] = useState(false);

    const { user, handleLogin, handleLogout } = useAuth();
    const isLoggedIn = async()=>{
        try{
        const res = await checkStatus();
        if(!res.data.user)return
        console.log(res?.data?.message)
        handleLogin(res?.data?.user)
        }catch(err){
            console.log("status check fail");
            console.log(err.message);
        }
    }

    useEffect(()=>{
        isLoggedIn()
    }, [])

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
                    <Link to="/" className="logo">
                        <div>
                            <img src="/assets/logo/logo_white.webp" alt="rebeca_logo" />
                            {/* REBECA */}
                        </div>
                    </Link>

                    {width <= 720 && (
                        <>
                            <Button
                                id="drawer-open-btn"
                                onClick={handleDrawerOpen}
                                variant="filled"
                                color="black"
                                arrowHover={false}
                                innerText={
                                    <span className="material-icons" style={{ color: "var(--red)" }}>
                                        menu
                                    </span>
                                }
                            ></Button>
                        </>
                    )}
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

                            {user ? (
                                <AvatarMenu user={user} handleLogout={handleLogout} />
                            ) : (
                                <div className="">
                                    <Button
                                        variant="filled"
                                        innerText={"Log in"}
                                        onClick={() => setLoginOpen((t) => t ^ 1)}
                                    />
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
            <Drawer variant="persistent" anchor="left" open={drawerOpen} className="drawer">
                <div className="bg">
                    <img src="/assets/imgs/menu.webp" alt="" />
                </div>
                <Link to="/" className="logo">
                    <div>
                        <img src="/assets/logo/logo_white.webp" alt="" />
                        {/* REBECA */}
                    </div>
                </Link>
                <Button
                    id="drawer-close-btn"
                    onClick={handleDrawerClose}
                    variant="text"
                    color="purple"
                    size="large"
                    className={"drawer-close-btn"}
                    innerText={<span className="material-icons">close</span>}
                    arrowHover={false}
                ></Button>
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
