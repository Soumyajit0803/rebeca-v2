import * as React from "react";
import {
    Box,
    Avatar,
    Menu,
    MenuItem,
    ListItemIcon,
    Divider,
    IconButton,
    Badge,
    Tooltip,
    Alert,
    Chip,
    Typography,
    CircularProgress,
} from "@mui/material";
import {
    PersonAdd,
    Settings,
    Logout,
    Login,
    Google,
    Person,
    Warning,
    LoginRounded,
    ArrowRight,
} from "@mui/icons-material";
import { useGoogleLogin } from "@react-oauth/google";
import { authWithGoogle } from "../../services/authApi";
import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";

import "./AccountMenu.css";

export default function AccountMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { user, handleLogin, handleLogout, userLoad, setUserLoad } = useAuth();
    const navigate = useNavigate();

    const responseGoogle = async (authResult) => {
        try {
            setUserLoad(true);
            if (authResult["code"]) {
                console.log(authResult.code);
                const result = await authWithGoogle(authResult.code);
                handleLogin(result.data.data.user);
                console.log(result);
            } else {
                console.log(authResult);
                throw new Error(authResult);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setUserLoad(false);
        }
    };

    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: "auth-code",
    });
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box className="accountMent">
            <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
                <Tooltip title="Account">
                    <Badge badgeContent={user && !user?.college ? 1 : 0} color="warning">
                        {user ? (
                            <IconButton
                                onClick={handleClick}
                                sx={{ width: 32, height: 32 }}
                                aria-controls={open ? "account-menu" : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                            >
                                <Avatar
                                    sx={{ width: 32, height: 32, bgcolor: "var(--primary)" }}
                                    src={user?.image}
                                ></Avatar>
                            </IconButton>
                        ) : (
                            <Button
                                onClick={handleClick}
                                innerText={"Login"}
                                loading={userLoad}
                            />
                        )}
                    </Badge>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: "visible",
                            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                            mt: 1.5,
                            "&::before": {
                                content: '""',
                                display: "block",
                                position: "absolute",
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: "#37474f",
                                transform: "translateY(-50%) rotate(45deg)",
                                zIndex: 0,
                            },
                            "*": {
                                color: "#fff",
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                {user && (
                    <div className="user-details">
                        <Avatar sx={{ width: 56, height: 56, bgcolor: "var(--primary)" }} src={user.image}></Avatar>
                        <div>
                            <div style={{ fontSize: "1.3rem", wordBreak: "break-all" }}>{user.name}</div>
                            <div style={{ fontSize: "0.9rem", color: "#90caf9", wordBreak: "break-all" }}>
                                {user.email}
                            </div>
                        </div>
                    </div>
                )}
                <Divider />
                {user && (
                    <MenuItem
                        onClick={() => {
                            handleClose();
                            navigate("/profile");
                        }}
                    >
                        <ListItemIcon>
                            <Person fontSize="small" />
                        </ListItemIcon>
                        My Profile{" "}
                        {!user?.college && (
                            <Chip
                                icon={<Warning />}
                                label="Complete your profile"
                                color="primary"
                                size="small"
                                sx={{ ml: 2 }}
                            />
                        )}
                    </MenuItem>
                )}
                {user && (
                    <MenuItem
                        onClick={() => {
                            handleClose();
                            handleLogout();
                        }}
                    >
                        <ListItemIcon>
                            <Login fontSize="medium" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                )}

                {!user && (
                    <MenuItem
                        onClick={() => {
                            handleClose();
                            googleLogin();
                        }}
                    >
                        <ListItemIcon>
                            <Google fontSize="medium" />
                        </ListItemIcon>
                        Login with Google
                    </MenuItem>
                )}
            </Menu>
        </Box>
    );
}
